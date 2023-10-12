import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const pdfDocument = new PDFDocument({
  layout: "landscape",
  size: "A4",
});

// Helper to move to next line
function jumpLine(document, lines) {
  for (let index = 0; index < lines; index++) {
    document.moveDown();
  }
}

export const generateCertificate2 = async (req, res, { studentName, courseName }) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

    pdfDocument.pipe(fs.createWriteStream(path.join(__dirname, 'certificate.pdf')));
    pdfDocument.rect(0, 0, pdfDocument.page.width, pdfDocument.page.height).fill("#fff");
    // pdfDocument.fontSize(10);

    // // Margin
    // const distanceMargin = 18;

    // pdfDocument
    //   .fillAndStroke("#0e8cc3")
    //   .lineWidth(20)
    //   .lineJoin("round")
    //   .rect(
    //     distanceMargin,
    //     distanceMargin,
    //     pdfDocument.page.width - distanceMargin * 2,
    //     pdfDocument.page.height - distanceMargin * 2
    //   )
    //   .stroke();

    pdfDocument.image(path.join(__dirname, 'assets', 'background.png'), 0,0, {width: pdfDocument.page.width, height: pdfDocument.page.height});

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    pdfDocument.image(path.join(__dirname, 'assets', 'logo.png'), pdfDocument.page.width / 2 - maxWidth / 2, 60, {
      fit: [maxWidth, maxHeight],
      align: "center",
    });

    jumpLine(pdfDocument, 5);

    // Content
    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
      .fontSize(24)
      .fill("#021c27")
      .text("CERTIFICATE OF COMPLETION", {
        align: "center",
      });

    jumpLine(pdfDocument, 1);

    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
      .fontSize(12)
      .fill("#021c27")
      .text("Present to", {
        align: "center",
      });

    jumpLine(pdfDocument, 1);

    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
      .fontSize(24)
      .fill("#021c27")
      .text(studentName, {
        align: "center",
      });

    jumpLine(pdfDocument, 1);

    pdfDocument
    .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
    .fontSize(12)
    .fill("#021c27")
    .text("Successfully completed", {
        align: "center",
      });
      
    jumpLine(pdfDocument, 1);
      
    pdfDocument
    .font(path.join(__dirname, 'fonts', 'NotoSansJP-Regular.otf'))
    .fontSize(18)
    .fill("#021c27")
    .text(courseName, {
      align: 'center',
    });

    jumpLine(pdfDocument, 1);

    pdfDocument.moveDown();
    pdfDocument.lineWidth(1);

    // Signatures
    const lineSize = 174;
    const signatureHeight = 450;

    pdfDocument.image(path.join(__dirname, 'assets', 'signature.png'), 130, pdfDocument.page.height / 2 + 100, {
      fit: [maxWidth, maxHeight]
    });

    pdfDocument.fillAndStroke("#021c27");
    pdfDocument.strokeOpacity(0.2);

    const startLine1 = 128;
    const endLine1 = 128 + lineSize;
    pdfDocument
      .moveTo(startLine1, signatureHeight)
      .lineTo(endLine1, signatureHeight)
      .stroke();

    const startLine2 = endLine1 + 32;
    const endLine2 = startLine2 + lineSize;
    pdfDocument
      .moveTo(startLine2, signatureHeight)

    const startLine3 = endLine2 + 32;
    const endLine3 = startLine3 + lineSize;

    pdfDocument
      .moveTo(startLine3, signatureHeight)
      .lineTo(endLine3, signatureHeight)
      .stroke();

    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
      .fontSize(12)
      .fill("#021c27")
      .text("Signature", startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Regular.otf'))
      .fontSize(12)
      .fill("#021c27")
      .text(formattedDate, startLine3, signatureHeight - 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    pdfDocument
      .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
      .fontSize(12)
      .fill("#021c27")
      .text("Date", startLine3, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    jumpLine(pdfDocument, 4);

    pdfDocument.end();
    return pdfDocument
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error occured",
      error: error.message,
    });

    console.log(error);
  }
};

// export const generateCertificate = async (req, res, { studentName, courseName }) => {
//   try {
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);

//     const today = new Date();
//     const options = { day: 'numeric', month: 'long', year: 'numeric' };
//     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);

//     pdfDocument.pipe(fs.createWriteStream(path.join(__dirname, 'certificate.pdf')));
//     pdfDocument.rect(0, 0, pdfDocument.page.width, pdfDocument.page.height).fill("#fff");
//     // pdfDocument.fontSize(10);

//     // // Margin
//     // const distanceMargin = 18;

//     // pdfDocument
//     //   .fillAndStroke("#0e8cc3")
//     //   .lineWidth(20)
//     //   .lineJoin("round")
//     //   .rect(
//     //     distanceMargin,
//     //     distanceMargin,
//     //     pdfDocument.page.width - distanceMargin * 2,
//     //     pdfDocument.page.height - distanceMargin * 2
//     //   )
//     //   .stroke();

//     pdfDocument.image(path.join(__dirname, 'assets', 'background.png'), 0,0, {width: pdfDocument.page.width, height: pdfDocument.page.height});

//     // Header
//     const maxWidth = 140;
//     const maxHeight = 70;

//     pdfDocument.image(path.join(__dirname, 'assets', 'logo.png'), pdfDocument.page.width / 2 - maxWidth / 2, 60, {
//       fit: [maxWidth, maxHeight],
//       align: "center",
//     });

//     jumpLine(pdfDocument, 5);

//     // Content
//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//       .fontSize(24)
//       .fill("#021c27")
//       .text("CERTIFICATE OF COMPLETION", {
//         align: "center",
//       });

//     jumpLine(pdfDocument, 1);

//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//       .fontSize(12)
//       .fill("#021c27")
//       .text("Present to", {
//         align: "center",
//       });

//     jumpLine(pdfDocument, 1);

//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//       .fontSize(24)
//       .fill("#021c27")
//       .text(studentName, {
//         align: "center",
//       });

//     jumpLine(pdfDocument, 1);

//     pdfDocument
//     .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//     .fontSize(12)
//     .fill("#021c27")
//     .text("Successfully completed", {
//         align: "center",
//       });
      
//     jumpLine(pdfDocument, 1);
      
//     pdfDocument
//     .font(path.join(__dirname, 'fonts', 'NotoSansJP-Regular.otf'))
//     .fontSize(18)
//     .fill("#021c27")
//     .text(courseName, {
//       align: 'center',
//     });

//     jumpLine(pdfDocument, 1);

//     pdfDocument.moveDown();
//     pdfDocument.lineWidth(1);

//     // Signatures
//     const lineSize = 174;
//     const signatureHeight = 450;

//     pdfDocument.image(path.join(__dirname, 'assets', 'signature.png'), 130, pdfDocument.page.height / 2 + 100, {
//       fit: [maxWidth, maxHeight]
//     });

//     pdfDocument.fillAndStroke("#021c27");
//     pdfDocument.strokeOpacity(0.2);

//     const startLine1 = 128;
//     const endLine1 = 128 + lineSize;
//     pdfDocument
//       .moveTo(startLine1, signatureHeight)
//       .lineTo(endLine1, signatureHeight)
//       .stroke();

//     const startLine2 = endLine1 + 32;
//     const endLine2 = startLine2 + lineSize;
//     pdfDocument
//       .moveTo(startLine2, signatureHeight)

//     const startLine3 = endLine2 + 32;
//     const endLine3 = startLine3 + lineSize;

//     pdfDocument
//       .moveTo(startLine3, signatureHeight)
//       .lineTo(endLine3, signatureHeight)
//       .stroke();

//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//       .fontSize(12)
//       .fill("#021c27")
//       .text("Signature", startLine1, signatureHeight + 10, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: "center",
//       });

//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Regular.otf'))
//       .fontSize(12)
//       .fill("#021c27")
//       .text(formattedDate, startLine3, signatureHeight - 25, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: "center",
//       });

//     pdfDocument
//       .font(path.join(__dirname, 'fonts', 'NotoSansJP-Bold.otf'))
//       .fontSize(12)
//       .fill("#021c27")
//       .text("Date", startLine3, signatureHeight + 10, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: "center",
//       });

//     jumpLine(pdfDocument, 4);

//     pdfDocument.end();
//     return pdfDocument
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unexpected error occured",
//       error: error.message,
//     });

//     console.log(error);
//   }
// };
