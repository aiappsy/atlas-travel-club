const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const manualsDataRaw = fs.readFileSync(path.join(__dirname, '../src/lib/manualsData.ts'), 'utf8');
const jsonMatch = manualsDataRaw.match(/export const ATLAS_TRAINING_MANUALS: TrainingManual\[\] = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  throw new Error('Could not parse ATLAS_TRAINING_MANUALS');
}
const ATLAS_TRAINING_MANUALS = JSON.parse(jsonMatch[1]);

const artifactsDir = 'C:/Users/paul/.gemini/antigravity/brain/758bc5ae-6be8-4bb5-959d-08c5895aa455';
const publicDir = path.join(__dirname, '../public');

function createExecutivePDF(manualsList, outputPath, docTitle, subtitle = 'Confidential Operational Playbook & Master Handbook') {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 40, bottom: 45, left: 45, right: 45 },
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    const pageWidth = doc.page.width;
    const contentWidth = pageWidth - 90;

    // ==========================================
    // COVER PAGE (LUXURY EXECUTIVE OBISIDIAN & GOLD)
    // ==========================================
    doc.rect(0, 0, pageWidth, doc.page.height).fill('#090D16');

    // Dual Gold Border
    doc.rect(20, 20, pageWidth - 40, doc.page.height - 40)
       .lineWidth(1.5)
       .strokeColor('#D97706')
       .stroke();

    doc.rect(24, 24, pageWidth - 48, doc.page.height - 48)
       .lineWidth(0.5)
       .strokeColor('#334155')
       .stroke();

    // Brand Header
    doc.fontSize(34).font('Helvetica-Bold').fillColor('#F59E0B')
       .text('ATLAS', 45, 150, { align: 'center', characterSpacing: 4 });

    doc.fontSize(11).font('Helvetica-Bold').fillColor('#94A3B8')
       .text('THE SOVEREIGN TRAVEL & WHOLESALE BANKING CLUB', 45, 195, { align: 'center', characterSpacing: 2 });

    // Gold Divider
    doc.moveTo(180, 220).lineTo(pageWidth - 180, 220).lineWidth(1.5).strokeColor('#F59E0B').stroke();

    // Document Title
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#FFFFFF')
       .text(docTitle, 55, 270, { align: 'center', lineGap: 4 });

    doc.fontSize(11).font('Helvetica').fillColor('#38BDF8')
       .text(subtitle, 55, 330, { align: 'center' });

    // Metadata Card
    const cardY = 460;
    doc.roundedRect(80, cardY, pageWidth - 160, 160, 8)
       .fillAndStroke('#0F172A', '#1E293B');

    doc.fontSize(10).font('Helvetica-Bold').fillColor('#F59E0B').text('EXECUTIVE SPECIFICATIONS & CLEARANCE', 100, cardY + 20);
    doc.fontSize(9).font('Helvetica').fillColor('#CBD5E1')
       .text('• Document Classification: Strictly Confidential (Closed-Loop Operations)', 100, cardY + 45)
       .text('• Version: 3.4.0 Production Build (2026 Edition)', 100, cardY + 65)
       .text('• Compliance Standard: Rate Parity Non-Disclosure & B2B Licensure', 100, cardY + 85)
       .text('• Automated Verification: Tested Against Live Gateway Endpoints', 100, cardY + 105)
       .text('• Target: Operations Team, Lead Integrators & Board of Directors', 100, cardY + 125);

    doc.fontSize(9).font('Helvetica-Bold').fillColor('#64748B')
       .text('© 2026 ATLAS Travel & Sovereign Banking Network. All Rights Reserved.', 45, 780, { align: 'center' });

    // ==========================================
    // CONTENT PAGES (CRISP LIGHT EXECUTIVE THEME)
    // ==========================================
    manualsList.forEach((manual, mIdx) => {
      doc.addPage();
      let curY = 45;

      // Role Header Card
      doc.roundedRect(45, curY, contentWidth, 75, 6).fill('#0F172A');
      doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#38BDF8')
         .text(`ROLE TRACK 0${mIdx + 1}: ${manual.badge.toUpperCase()}`, 58, curY + 12);
      doc.fontSize(15).font('Helvetica-Bold').fillColor('#FFFFFF')
         .text(manual.roleTitle, 58, curY + 28);
      doc.fontSize(8).font('Helvetica').fillColor('#94A3B8')
         .text(`Target Audience: ${manual.targetAudience}`, 58, curY + 52, { width: contentWidth - 25 });

      curY += 85;

      // Summary Card
      doc.roundedRect(45, curY, contentWidth, 42, 6).fillAndStroke('#F8FAFC', '#E2E8F0');
      doc.fontSize(8).font('Helvetica-Oblique').fillColor('#334155')
         .text(`Executive Summary: ${manual.summary}`, 55, curY + 8, { width: contentWidth - 20, lineGap: 1.5 });

      curY += 50;

      manual.chapters.forEach((chapter, chIdx) => {
        if (curY > 640) {
          doc.addPage();
          curY = 45;
        }

        // Chapter Header Strip
        doc.roundedRect(45, curY, contentWidth, 24, 4).fill('#1E293B');
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#F59E0B')
           .text(`${chapter.title}`, 55, curY + 7);
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#38BDF8')
           .text(`EST. ${chapter.readingTimeMinutes} MINS`, pageWidth - 140, curY + 7, { align: 'right' });

        curY += 32;

        // Content Paragraphs
        const lines = chapter.content.split('\n');
        lines.forEach((line) => {
          if (curY > 740) {
            doc.addPage();
            curY = 45;
          }

          const trimmed = line.trim();
          if (trimmed.startsWith('###')) {
            curY += 4;
            doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#0284C7')
               .text(trimmed.replace(/^###\s*/, ''), 50, curY);
            curY += 14;
          } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#0F172A')
               .text(trimmed.replace(/\*\*/g, ''), 50, curY, { width: contentWidth });
            curY = doc.y + 3;
          } else if (trimmed.startsWith('```')) {
            // Code block marker
          } else if (trimmed.length > 0) {
            const cleanText = trimmed.replace(/\*\*/g, '').replace(/`/g, '');
            doc.fontSize(8).font('Helvetica').fillColor('#334155')
               .text(cleanText, 50, curY, { width: contentWidth, lineGap: 2 });
            curY = doc.y + 4;
          }
        });

        // Action Checklist Box
        if (chapter.actionChecklist && chapter.actionChecklist.length > 0) {
          curY += 6;
          if (curY > 670) {
            doc.addPage();
            curY = 45;
          }

          const boxH = 20 + (chapter.actionChecklist.length * 14);
          doc.roundedRect(45, curY, contentWidth, boxH, 6)
             .fillAndStroke('#ECFDF5', '#10B981');

          doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#065F46')
             .text('MANDATORY OPERATOR CHECKLIST:', 55, curY + 7);
          let checkY = curY + 22;

          chapter.actionChecklist.forEach((chk) => {
            doc.fontSize(7.5).font('Helvetica').fillColor('#047857')
               .text(`[✓]   ${chk}`, 65, checkY, { width: contentWidth - 30 });
            checkY += 13;
          });

          curY += boxH + 12;
        } else {
          curY += 10;
        }

        doc.moveTo(45, curY).lineTo(pageWidth - 45, curY).lineWidth(0.5).strokeColor('#E2E8F0').stroke();
        curY += 12;
      });
    });

    // Running Footer
    const pageRange = doc.bufferedPageRange();
    for (let i = 1; i < pageRange.count; i++) {
      doc.switchToPage(i);
      doc.moveTo(45, 800).lineTo(pageWidth - 45, 800).lineWidth(0.5).strokeColor('#E2E8F0').stroke();
      doc.fontSize(7.5).font('Helvetica').fillColor('#94A3B8')
         .text('ATLAS SOVEREIGN OPERATIONS • STRICTLY CONFIDENTIAL', 45, 808);
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#64748B')
         .text(`Page ${i + 1} of ${pageRange.count}`, pageWidth - 120, 808, { align: 'right' });
    }

    doc.end();
    writeStream.on('finish', () => {
      console.log(`Successfully generated PDF: ${outputPath}`);
      resolve(true);
    });
  });
}

async function runAll() {
  console.log('Generating Executive-Grade Formatted PDFs...');

  // 1. Master Operations Manual
  const masterPath = path.join(publicDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf');
  await createExecutivePDF(ATLAS_TRAINING_MANUALS, masterPath, 'Operations Academy Master Manuals Collection');
  if (fs.existsSync(artifactsDir)) {
    fs.copyFileSync(masterPath, path.join(artifactsDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf'));
  }

  // 2. Individual Manuals
  for (const m of ATLAS_TRAINING_MANUALS) {
    const slug = m.id.replace(/-/g, '_');
    const outPath = path.join(publicDir, `ATLAS_${slug}.pdf`);
    await createExecutivePDF([m], outPath, m.roleTitle, `Specialized Playbook: ${m.badge}`);
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(outPath, path.join(artifactsDir, `ATLAS_${slug}.pdf`));
    }
  }

  console.log('All Luxury Executive PDFs generated successfully!');
}

runAll();
