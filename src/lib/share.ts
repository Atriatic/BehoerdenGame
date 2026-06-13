import type { GameOverCause } from '../types';
import { GAME_OVER_MESSAGES } from '../config/game-config';

interface DailyInfo {
  day: number;
  dateStr: string;
}

export async function generateShareCard(
  score: number,
  cause: GameOverCause,
  percentile: number,
  daily?: DailyInfo
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#FAFAF8';
  ctx.fillRect(0, 0, 1080, 1920);

  // Top petrol header bar
  ctx.fillStyle = '#1A3A3A';
  ctx.fillRect(0, 0, 1080, 320);

  // Header text
  ctx.fillStyle = '#FAFAF8';
  ctx.font = 'bold 52px serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('AMT MUSTERHAUSEN', 540, 140);

  // Daily badge in header
  if (daily) {
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#F26C4F';
    ctx.fillText(`📅 Akte des Tages #${daily.day} · ${daily.dateStr}`, 540, 185);
  }

  ctx.font = '32px serif';
  ctx.fillStyle = '#F26C4F';
  ctx.fillText('BEHÖRDEN-PLANSPIEL', 540, 200);

  // Decorative line
  ctx.strokeStyle = '#F26C4F';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(120, 240);
  ctx.lineTo(960, 240);
  ctx.stroke();

  ctx.fillStyle = '#FAFAF8';
  ctx.font = '26px serif';
  ctx.fillText('amtlichgut.de/amt', 540, 290);

  // DIENSTZEUGNIS watermark
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#1A3A3A';
  ctx.font = 'bold 160px serif';
  ctx.textAlign = 'center';
  ctx.translate(540, 960);
  ctx.rotate(-Math.PI / 6);
  ctx.fillText('DIENSTZEUGNIS', 0, 0);
  ctx.restore();

  // Official border
  ctx.strokeStyle = '#1A3A3A';
  ctx.lineWidth = 8;
  ctx.strokeRect(60, 360, 960, 1460);
  ctx.strokeStyle = '#F26C4F';
  ctx.lineWidth = 3;
  ctx.strokeRect(72, 372, 936, 1436);

  // Document reference number
  ctx.fillStyle = '#888';
  ctx.font = '24px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`Az.: MH-${score.toString().padStart(4, '0')}-${new Date().getFullYear()}`, 980, 420);

  // "HIERMIT WIRD AMTLICH BESTÄTIGT"
  ctx.fillStyle = '#1A3A3A';
  ctx.font = 'bold 38px serif';
  ctx.textAlign = 'center';
  ctx.fillText('HIERMIT WIRD AMTLICH BESTÄTIGT:', 540, 500);

  // Score - big
  ctx.font = 'bold 120px serif';
  ctx.fillStyle = '#F26C4F';
  ctx.fillText(score.toString(), 540, 660);

  ctx.font = 'bold 52px serif';
  ctx.fillStyle = '#1A3A3A';
  ctx.fillText('Akten überlebt', 540, 730);

  // Decorative divider
  ctx.strokeStyle = '#1A3A3A';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(150, 780);
  ctx.lineTo(930, 780);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cause of death section
  const gameOverData = GAME_OVER_MESSAGES[cause];
  ctx.fillStyle = '#1A3A3A';
  ctx.font = 'bold 40px serif';
  ctx.textAlign = 'center';

  // Wrap title
  const title = gameOverData.title;
  ctx.fillText(title, 540, 860);

  // Wrap description text
  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#333';
  const words = gameOverData.text.split(' ');
  let line = '';
  let y = 940;
  const maxWidth = 880;
  const lineHeight = 44;

  for (const word of words) {
    const testLine = line + word + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), 540, y);
      line = word + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line.trim(), 540, y);

  // Percentile
  ctx.fillStyle = '#1A3A3A';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(`Besser als ${percentile}% aller Amtsleiter`, 540, 1200);

  // Circular stamp
  const stampX = 800;
  const stampY = 1380;
  const stampR = 140;

  ctx.save();
  ctx.translate(stampX, stampY);
  ctx.rotate(-0.25);

  // Outer ring
  ctx.strokeStyle = '#F26C4F';
  ctx.lineWidth = 12;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(0, 0, stampR, 0, Math.PI * 2);
  ctx.stroke();

  // Inner ring
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, stampR - 24, 0, Math.PI * 2);
  ctx.stroke();

  // "GAME OVER" center text
  ctx.fillStyle = '#F26C4F';
  ctx.font = 'bold 44px serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAME', 0, -16);
  ctx.fillText('OVER', 0, 36);

  // Stars around the top
  ctx.font = '24px sans-serif';
  for (let i = 0; i < 5; i++) {
    const angle = -Math.PI / 2 + (i - 2) * 0.35;
    ctx.fillText('★', Math.cos(angle) * (stampR - 12), Math.sin(angle) * (stampR - 12));
  }

  ctx.restore();

  // Left bottom area - date
  ctx.fillStyle = '#333';
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(
    `Musterhausen, ${new Date().toLocaleDateString('de-DE')}`,
    150,
    1700
  );

  // Signature line
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, 1740);
  ctx.lineTo(500, 1740);
  ctx.stroke();
  ctx.font = '22px sans-serif';
  ctx.fillText('Amtsleitung', 150, 1770);

  // Footer
  ctx.fillStyle = '#1A3A3A';
  ctx.fillRect(0, 1820, 1080, 100);
  ctx.fillStyle = '#FAFAF8';
  ctx.font = '28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('amtlichgut.de/amt · Schaffst du mehr?', 540, 1878);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      'image/png'
    );
  });
}

export async function shareResult(
  score: number,
  cause: GameOverCause,
  percentile: number,
  daily?: DailyInfo
): Promise<void> {
  const blob = await generateShareCard(score, cause, percentile, daily);
  const file = new File([blob], 'amt-musterhausen.png', { type: 'image/png' });

  const text = daily
    ? `Akte des Tages #${daily.day}: Ich habe ${score} Akten überlebt! Schaffst du mehr? 🏛️`
    : `Ich habe ${score} Akten überlebt! Schaffst du mehr? 🏛️`;

  const shareData: ShareData = {
    title: 'Amt Musterhausen',
    text,
    url: 'https://amtlichgut.de/amt',
  };

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ ...shareData, files: [file] });
      return;
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      // Fall through to download
    }
  }

  // Fallback: download the image
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'amt-musterhausen.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
