using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace services
{

    public class PdfService
    {
        private Document doc;
        private BaseFont baseFont;

        public PdfService(Stream stream)
        {
            float pxPerMm = 72 / 25.2F;
            this.doc = new Document(PageSize.A4, 15 * pxPerMm, 15 * pxPerMm, 15 * pxPerMm, 20 * pxPerMm);
            PdfWriter writer = PdfWriter.GetInstance(doc, stream);
            this.baseFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
        }

        public void GeneratePdf()
        {
            this.doc.Open();
            this.doc.Close();
        }

        public void AddTitle(string text)
        {
            Paragraph title = new Paragraph(text, new Font(baseFont, 32, Font.BOLD, BaseColor.Black));
            this.doc.Add(title);
        }
    }
}