import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('nl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const bountyMessage = "If you found this value you deserve to get 15% off your first AI project. Good job. Call Maximilian Bladt at +31642698918 with code bounty-first-found to claim this.";
    if (!localStorage.getItem('bounty')) {
      localStorage.setItem('bounty', bountyMessage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'nl' ? 'en' : 'nl';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const translations = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      headline: 'Transformeer uw bedrijf met',
      subheadline: 'Wij optimaliseren uw operaties, automatiseren uw workflows en versnellen uw groei met geavanceerde AI-technologie op maat gemaakt voor uw bedrijfsbehoeften.',
      callUs: 'Bel ons',
      contactUs: 'Vul het formulier in'
    },
    presentation: {
      stat1Number: '100+',
      stat1Label: 'Geautomatiseerde Jobs',
      stat2Number: '3M',
      stat2Label: 'Bespaard aan Loonkosten'
    },
    services: {
      title: 'Onze AI Oplossingen',
      subtitle: 'Klik om te ontdekken hoe elke dienst uw bedrijf transformeert',
      howItWorks: 'Hoe het werkt'
    },
    cases: {
      title: 'Succesverhalen',
      subtitle: 'Echte transformaties, echte resultaten. Zie hoe we bedrijven in verschillende sectoren hebben gerevolutioneerd.',
      viewFullCase: 'Bekijk Volledige Case Study'
    },
    team: {
      title: 'Ontmoet Uw AI Innovatie Partners'
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'Algemene vragen',
      phone: '+31 6 42698918',
      phoneLabel: 'Openingstijden: 9:00 - 18:00 CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Nederland',
      ctaTitle: 'Klaar om uw bedrijf te transformeren?',
      ctaSubtitle: 'Bel ons direct of vul het contactformulier in',
      callUs: 'Bel ons: +31 6 42698918',
      fillForm: 'Vul het formulier in',
      copyright: '© 2026 Optivaize. Alle rechten voorbehouden. • Optimize What Matters.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Algemene voorwaarden',
      cookiePolicy: 'Cookiebeleid'
    },
    bedankt: {
      title: 'voor uw bericht!',
      subtitle: 'Wij hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op. Meestal binnen 24 uur.',
      directContact: 'Direct contact?',
      callUs: 'Bel ons: +31 6 42698918',
      linkedin: 'Geronimo op LinkedIn',
      email: 'Stuur een e-mail',
      backHome: 'Terug naar Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      cases: 'Cases',
      team: 'Team',
      contact: 'Contact'
    },
    hero: {
      headline: 'Transform your business with',
      subheadline: 'We optimize your operations, automate your workflows, and accelerate your growth with cutting-edge AI technology tailored to your business needs.',
      callUs: 'Call Us',
      contactUs: 'Fill in the Form'
    },
    presentation: {
      stat1Number: '100+',
      stat1Label: 'Automated Jobs',
      stat2Number: '3M',
      stat2Label: 'Saved in Wages'
    },
    services: {
      title: 'Our AI Solutions',
      subtitle: 'Click to explore how each service transforms your business',
      howItWorks: 'How it Works'
    },
    cases: {
      title: 'Success Stories',
      subtitle: 'Real transformations, real results. See how we\'ve revolutionized businesses across industries.',
      viewFullCase: 'View Full Case Study'
    },
    team: {
      title: 'Meet Your AI Innovation Partners'
    },
    footer: {
      tagline: '"Optimize What Matters"',
      email: 'info@optivaize.nl',
      emailLabel: 'General Inquiries',
      phone: '+31 6 42698918',
      phoneLabel: 'Business Hours: 9AM - 6PM CET',
      address: 'Groenekanseweg 70, De Bilt',
      addressDetail: '3732AG, Netherlands',
      ctaTitle: 'Ready to transform your business?',
      ctaSubtitle: 'Call us directly or fill in the contact form',
      callUs: 'Call Us: +31 6 42698918',
      fillForm: 'Fill in the Form',
      copyright: '© 2026 Optivaize. All rights reserved. • Optimize What Matters.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      cookiePolicy: 'Cookie Policy'
    },
    bedankt: {
      title: 'for your message!',
      subtitle: 'We have received your request and will contact you as soon as possible. Usually within 24 hours.',
      directContact: 'Direct contact?',
      callUs: 'Call Us: +31 6 42698918',
      linkedin: 'Geronimo on LinkedIn',
      email: 'Send an Email',
      backHome: 'Back to Home',
      geronimo: {
        name: 'Geronimo S.',
        role: 'Head of Operations & Marketing'
      },
      team: {
        geronimo: 'Operations & Marketing',
        max: 'CEO',
        filip: 'AI & Data Science'
      }
    }
  }
};
