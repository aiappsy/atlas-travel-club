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

function createLuxuryPDF(manualsList, outputPath, docTitle, subtitle = 'Confidential Operational Playbook & Master Handbook') {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 45, bottom: 45, left: 45, right: 45 },
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // ==========================================
    // COVER PAGE
    // ==========================================
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#090D16');

    // Subtle Gold Border Accent
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .lineWidth(1.5)
       .strokeColor('#D97706')
       .stroke();

    doc.rect(24, 24, doc.page.width - 48, doc.page.height - 48)
       .lineWidth(0.5)
       .strokeColor('#334155')
       .stroke();

    // Brand Header
    doc.fontSize(32).font('Helvetica-Bold').fillColor('#F59E0B')
       .text('ATLAS', 45, 160, { align: 'center', characterSpacing: 4 });

    doc.fontSize(11).font('Helvetica-Bold').fillColor('#94A3B8')
       .text('THE SOVEREIGN TRAVEL & WHOLESALE BANKING CLUB', 45, 205, { align: 'center', characterSpacing: 2 });

    // Gold Divider Line
    doc.moveTo(180, 230).lineTo(doc.page.width - 180, 230).lineWidth(1.5).strokeColor('#F59E0B').stroke();

    // Document Title
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#FFFFFF')
       .text(docTitle, 55, 280, { align: 'center', lineGap: 4 });

    doc.fontSize(11).font('Helvetica').fillColor('#38BDF8')
       .text(subtitle, 55, 335, { align: 'center' });

    // Metadata Card on Cover
    const cardY = 460;
    doc.roundedRect(80, cardY, doc.page.width - 160, 160, 8)
       .fillAndStroke('#0F172A', '#1E293B');

    doc.fontSize(10).font('Helvetica-Bold').fillColor('#F59E0B').text('EXECUTIVE SPECIFICATIONS & CLEARANCE', 100, cardY + 20);
    doc.fontSize(9).font('Helvetica').fillColor('#CBD5E1')
       .text('• Document Classification: Strictly Confidential (Closed-Loop Operations)', 100, cardY + 45)
       .text('• Version: 3.4.0 Production Build (2026 Edition)', 100, cardY + 65)
       .text('• Compliance Standard: Rate Parity Non-Disclosure & B2B Distribution Licensure', 100, cardY + 85)
       .text('• Automated Verification: Verified Against Live Gateway Specs & API Endpoints', 100, cardY + 105)
       .text('• Distribution: ATLAS Operations Team, Integration Specialists & Board of Directors', 100, cardY + 125);

    doc.fontSize(9).font('Helvetica-Bold').fillColor('#64748B')
       .text('© 2026 ATLAS Travel & Sovereign Banking Network. All Rights Reserved.', 45, 780, { align: 'center' });

    // ==========================================
    // MANUAL CHAPTER PAGES
    // ==========================================
    manualsList.forEach((manual, mIdx) => {
      // Role Title Header Page
      doc.addPage();
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0B1120');

      // Top Role Banner
      doc.roundedRect(45, 45, doc.page.width - 90, 80, 8).fillAndStroke('#0F172A', '#1E293B');
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#38BDF8').text(`ROLE TRACK 0${mIdx + 1}: ${manual.badge.toUpperCase()}`, 60, 58);
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#FFFFFF').text(manual.roleTitle, 60, 74);
      doc.fontSize(8.5).font('Helvetica').fillColor('#94A3B8').text(`Target: ${manual.targetAudience}`, 60, 98, { width: 470 });

      // Summary Card
      doc.roundedRect(45, 135, doc.page.width - 90, 50, 6).fillAndStroke('#1E293B', '#334155');
      doc.fontSize(8.5).font('Helvetica-Oblique').fillColor('#E2E8F0').text(`Executive Summary: ${manual.summary}`, 55, 145, { width: 485, lineGap: 2 });

      let curY = 200;

      manual.chapters.forEach((chapter, chIdx) => {
        if (curY > 640) {
          doc.addPage();
          doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0B1120');
          curY = 45;
        }

        // Chapter Header Card
        doc.roundedRect(45, curY, doc.page.width - 90, 28, 4).fill('#1E293B');
        doc.fontSize(11).font('Helvetica-Bold').fillColor('#F59E0B')
           .text(`${chapter.title}`, 55, curY + 8);
        doc.fontSize(8.5).font('Helvetica').fillColor('#94A3B8')
           .text(`Est. ${chapter.readingTimeMinutes} mins`, doc.page.width - 120, curY + 9, { align: 'right' });
        curY += 36;

        // Clean and format content
        const lines = chapter.content.split('\n');
        lines.forEach((line) => {
          if (curY > 740) {
            doc.addPage();
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0B1120');
            curY = 45;
          }

          const trimmed = line.trim();
          if (trimmed.startsWith('###')) {
            curY += 4;
            doc.fontSize(10).font('Helvetica-Bold').fillColor('#38BDF8')
               .text(trimmed.replace(/^###\s*/, ''), 50, curY);
            curY += 14;
          } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            doc.fontSize(9).font('Helvetica-Bold').fillColor('#FFFFFF')
               .text(trimmed.replace(/\*\*/g, ''), 50, curY, { width: 495 });
            curY = doc.y + 4;
          } else if (trimmed.startsWith('```')) {
            // Code block delimiter - skip or format
          } else if (trimmed.length > 0) {
            const cleanText = trimmed.replace(/\*\*/g, '').replace(/`/g, '');
            doc.fontSize(8.5).font('Helvetica').fillColor('#CBD5E1')
               .text(cleanText, 50, curY, { width: 495, lineGap: 2.5 });
            curY = doc.y + 4;
          }
        });

        // Action Checklist Box
        if (chapter.actionChecklist && chapter.actionChecklist.length > 0) {
          curY += 6;
          if (curY > 670) {
            doc.addPage();
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0B1120');
            curY = 45;
          }

          const boxH = 22 + (chapter.actionChecklist.length * 15);
          doc.roundedRect(45, curY, doc.page.width - 90, boxH, 6)
             .fillAndStroke('#062419', '#059669');

          doc.fontSize(9).font('Helvetica-Bold').fillColor('#34D399')
             .text('MANDATORY OPERATOR CHECKLIST:', 55, curY + 7);
          let checkY = curY + 22;

          chapter.actionChecklist.forEach((chk) => {
            doc.fontSize(8).font('Helvetica').fillColor('#A7F3D0')
               .text(`[✓]   ${chk}`, 65, checkY, { width: 465 });
            checkY += 14;
          });

          curY += boxH + 15;
        } else {
          curY += 12;
        }

        doc.moveTo(45, curY).lineTo(doc.page.width - 45, curY).lineWidth(0.5).strokeColor('#1E293B').stroke();
        curY += 14;
      });
    });

    // Add page numbers on all content pages
    const pageRange = doc.bufferedPageRange();
    for (let i = 1; i < pageRange.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(7.5).font('Helvetica').fillColor('#64748B')
         .text('ATLAS SOVEREIGN OPERATIONS MANUAL • CONFIDENTIAL', 45, 800);
      doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#64748B')
         .text(`Page ${i + 1} of ${pageRange.count}`, doc.page.width - 120, 800, { align: 'right' });
    }

    doc.end();
    writeStream.on('finish', () => {
      console.log(`Successfully generated luxury PDF: ${outputPath}`);
      resolve(true);
    });
  });
}

async function runAll() {
  console.log('Generating Luxury PDFs...');

  // 1. Master Operations Manual
  const masterPath = path.join(publicDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf');
  await createLuxuryPDF(ATLAS_TRAINING_MANUALS, masterPath, 'Operations Academy Master Manuals Collection');
  if (fs.existsSync(artifactsDir)) {
    fs.copyFileSync(masterPath, path.join(artifactsDir, 'ATLAS_Master_Operations_Manuals_Collection.pdf'));
  }

  // 2. Individual Manuals
  for (const m of ATLAS_TRAINING_MANUALS) {
    const slug = m.id.replace(/-/g, '_');
    const outPath = path.join(publicDir, `ATLAS_${slug}.pdf`);
    await createLuxuryPDF([m], outPath, m.roleTitle, `Specialized Playbook: ${m.badge}`);
    if (fs.existsSync(artifactsDir)) {
      fs.copyFileSync(outPath, path.join(artifactsDir, `ATLAS_${slug}.pdf`));
    }
  }

  console.log('All Luxury PDFs generated and synchronized with artifacts!');
}

runAll();
