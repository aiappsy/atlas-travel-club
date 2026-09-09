const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const manualsDataRaw = fs.readFileSync(path.join(__dirname, '../src/lib/manualsData.ts'), 'utf8');
const jsonMatch = manualsDataRaw.match(/export const ATLAS_TRAINING_MANUALS: TrainingManual\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  throw new Error('Could not parse ATLAS_TRAINING_MANUALS from src/lib/manualsData.ts');
}
const ATLAS_TRAINING_MANUALS = JSON.parse(jsonMatch[1]);

const artifactsDir = 'C:/Users/paul/.gemini/antigravity/brain/758bc5ae-6be8-4bb5-959d-08c5895aa455';
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Markdown Files
ATLAS_TRAINING_MANUALS.forEach((manual) => {
  let md = `# ATLAS Operational Training Manual\n\n`;
  md += `## Role: ${manual.roleTitle}\n`;
  md += `**Badge**: ${manual.badge}\n`;
  md += `**Target Audience**: ${manual.targetAudience}\n\n`;
  md += `### Executive Summary\n${manual.summary}\n\n---\n\n`;

  manual.chapters.forEach((chapter) => {
    md += `## ${chapter.title} (Est. Reading Time: ${chapter.readingTimeMinutes} mins)\n\n`;
    md += `${chapter.content}\n\n`;
    if (chapter.actionChecklist && chapter.actionChecklist.length > 0) {
      md += `### Operator Action Checklist:\n`;
      chapter.actionChecklist.forEach((chk) => {
        md += `- [ ] ${chk}\n`;
      });
      md += `\n`;
    }
    md += `---\n\n`;
  });

  const slug = manual.id.replace(/-/g, '_');
  const filename = `ATLAS_${slug}.md`;

  fs.writeFileSync(path.join(publicDir, filename), md, 'utf8');
  if (fs.existsSync(artifactsDir)) {
    fs.writeFileSync(path.join(artifactsDir, filename), md, 'utf8');
  }
  console.log(`Wrote markdown: ${filename}`);
});

// Master Combined Markdown
let masterMd = `# ATLAS Master Operations Manuals & Training Collection (2026 Edition)\n\n`;
masterMd += `The complete training syllabus for ATLAS Travel & Sovereign Banking Club operations team.\n\n`;
ATLAS_TRAINING_MANUALS.forEach((manual, i) => {
  masterMd += `# Section ${i + 1}: ${manual.roleTitle}\n`;
  masterMd += `**Focus Area**: ${manual.badge}\n`;
  masterMd += `**Summary**: ${manual.summary}\n\n`;
  manual.chapters.forEach((ch) => {
    masterMd += `## ${ch.title}\n\n${ch.content}\n\n`;
    if (ch.actionChecklist && ch.actionChecklist.length > 0) {
      masterMd += `### Action Checklist:\n`;
      ch.actionChecklist.forEach((c) => {
        masterMd += `- [ ] ${c}\n`;
      });
      masterMd += `\n`;
    }
  });
  masterMd += `\n---\n\n`;
});
fs.writeFileSync(path.join(publicDir, 'ATLAS_Master_Operations_Manuals_Collection.md'), masterMd, 'utf8');
if (fs.existsSync(artifactsDir)) {
  fs.writeFileSync(path.join(artifactsDir, 'ATLAS_Master_Operations_Manuals_Collection.md'), masterMd, 'utf8');
}

// 2. Generate PDF using PDFKit
function generateManualPdf(manualsList, outputPath, title) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Cover Page
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#090D16');

  doc.fontSize(28).fillColor('#D97706').text('ATLAS', 50, 180, { align: 'center', characterSpacing: 2 });
  doc.fontSize(14).fillColor('#94A3B8').text('THE SOVEREIGN TRAVEL & WHOLESALE CLUB', 50, 220, { align: 'center', characterSpacing: 1.5 });
  
  doc.fontSize(22).fillColor('#FFFFFF').text(title, 50, 290, { align: 'center' });
  doc.fontSize(11).fillColor('#38BDF8').text('Confidential Operational Playbook & Master Handbook', 50, 335, { align: 'center' });

  doc.fontSize(10).fillColor('#64748B').text('Version 2.4.0 • 2026 Production Edition • Rate Parity Protected', 50, 720, { align: 'center' });

  // Content Pages
  manualsList.forEach((manual) => {
    doc.addPage();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0F172A');

    // Header
    doc.fontSize(18).fillColor('#F59E0B').text(manual.roleTitle, 50, 50);
    doc.fontSize(10).fillColor('#38BDF8').text(`Target: ${manual.targetAudience}`, 50, 78);
    doc.fontSize(9).fillColor('#94A3B8').text(manual.summary, 50, 95, { width: 495 });

    doc.moveTo(50, 140).lineTo(545, 140).strokeColor('#334155').stroke();

    let curY = 155;

    manual.chapters.forEach((chapter) => {
      if (curY > 650) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0F172A');
        curY = 50;
      }

      doc.fontSize(13).fillColor('#FFFFFF').text(chapter.title, 50, curY);
      curY += 20;

      // Clean markdown symbols for PDF text
      const cleanContent = chapter.content
        .replace(/###/g, '')
        .replace(/##/g, '')
        .replace(/#/g, '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '');

      doc.fontSize(8.5).fillColor('#CBD5E1').text(cleanContent, 50, curY, { width: 495, lineGap: 2 });
      curY = doc.y + 12;

      if (chapter.actionChecklist && chapter.actionChecklist.length > 0) {
        if (curY > 680) {
          doc.addPage();
          doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0F172A');
          curY = 50;
        }
        doc.fontSize(9.5).fillColor('#10B981').text('Mandatory Checklist:', 50, curY);
        curY += 14;
        chapter.actionChecklist.forEach((chk) => {
          doc.fontSize(8).fillColor('#E2E8F0').text(`[ ]  ${chk}`, 65, curY, { width: 475 });
          curY += 12;
        });
        curY += 10;
      }

      doc.moveTo(50, curY).lineTo(545, curY).strokeColor('#1E293B').stroke();
      curY += 15;
    });
  });

  doc.end();

  return new Promise((resolve) => {
    writeStream.on('finish', () => {
      console.log(`Generated PDF: ${outputPath}`);
      resolve(true);
    });
  });
}

async function run() {
  // Master Combined PDF
  await generateManualPdf(
    ATLAS_TRAINING_MANUALS,
    path.join(publicDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf'),
    'Operations Academy Master Manuals Collection'
  );
  if (fs.existsSync(artifactsDir)) {
    await generateManualPdf(
      ATLAS_TRAINING_MANUALS,
      path.join(artifactsDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf'),
      'Operations Academy Master Manuals Collection'
    );
  }

  // Individual Manuals
  for (const m of ATLAS_TRAINING_MANUALS) {
    const slug = m.id.replace(/-/g, '_');
    const pPath = path.join(publicDir, `ATLAS_${slug}.pdf`);
    await generateManualPdf([m], pPath, m.roleTitle);
    if (fs.existsSync(artifactsDir)) {
      const aPath = path.join(artifactsDir, `ATLAS_${slug}.pdf`);
      await generateManualPdf([m], aPath, m.roleTitle);
    }
  }

  console.log('All PDF Manuals successfully generated!');
}

run();
