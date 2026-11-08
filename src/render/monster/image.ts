import { PICTURE_H, PICTURE_W, type MonsterPicture, type PictureState } from './picture';

/**
 * A monster picture backed by a generated image, behind the same interface as the code-drawn ones.
 * Code still does the living part: breathing, looming, a hit flash, paling with damage, and fading out when it dies.
 */
export class ImagePicture implements MonsterPicture {
  readonly width = PICTURE_W;
  readonly height = PICTURE_H;

  constructor(private image: CanvasImageSource, private breathing = 0.012) {}

  draw(ctx: CanvasRenderingContext2D, t: number, s: PictureState): void {
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, PICTURE_W, PICTURE_H);
    const scale = 1 + Math.sin(t * 1.5) * this.breathing + s.lunge * 0.09;
    ctx.globalAlpha = Math.max(0, 1 - s.dying);
    ctx.translate(PICTURE_W / 2, PICTURE_H);
    ctx.scale(scale, scale);
    ctx.translate(-PICTURE_W / 2, -PICTURE_H);
    ctx.drawImage(this.image, 0, 0, PICTURE_W, PICTURE_H);
    ctx.restore();
    if (s.damage > 0 && s.dying < 1) {
      ctx.save();
      ctx.globalAlpha = Math.min(0.6, s.damage * 0.6) * (1 - s.dying);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, PICTURE_W, PICTURE_H);
      ctx.restore();
    }
    if (s.hit > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, s.hit) * 0.7;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, PICTURE_W, PICTURE_H);
      ctx.restore();
    }
  }
}
