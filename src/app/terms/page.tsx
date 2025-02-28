import fs from "fs";
import path from "path";

type Section = {
  title: string;
  content: string;
};

type TermsData = {
  [key: string]: {
    title: string;
    sections: Section[];
  };
};

export default function TermsOfService() {
  const filePath = path.join(process.cwd(), "src/data", "terms.json");
  const termsData: TermsData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <main className="max-w-4xl mx-auto p-6 font-mallory text-secondary">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-center mb-12 tracking-tight">
        Terms of Service
      </h1>
      {Object.entries(termsData).map(([key, section]) => (
        <section key={key} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 uppercase tracking-tight">
            {section.title}
          </h2>
          {section.sections.map((sub, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold uppercase mb-3 tracking-tight">
                {sub.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                {sub.content}
              </p>
            </div>
          ))}
          <p>By using the services provided by OVKAY, a product of Goederen Private Limited, the User acknowledges having read, understood, and agreed to these Terms and agrees to be bound by them.</p>
        </section>
      ))}
    </main>
  );
}
