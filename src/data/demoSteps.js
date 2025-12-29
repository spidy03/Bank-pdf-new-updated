const demoSteps = [
  // Step 0: Welcome Screen
  {
    id: 0,
    image: "/dashboard.png",
    imageWidth: 1280,
    imageHeight: 720,
    instruction: "Bank PDF Statement to Tally Demo",
    delay: 500,
    highlight: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    highlightType: "none",
    isPopupOnly: true,
    popupType: "welcome",
    title: "Bank PDF Statement to Tally Demo",
    message:
      "A powerful PDF bank statement converter with precision and flexibility:\n\n✓ Custom page & area selection for accurate conversion\n✓ Smart transaction table detection and extraction\n✓ Auto-detect ledger names from transaction narration\n✓ Auto-identify voucher type (Receipt, Payment, Contra)\n\nLet's explore how to seamlessly convert your bank statements into TallyPrime with TallyConnects Bank-PDF Template.",
    buttonText: "Start Demo",
    audioSrc: "/audio/step0-welcome-narration.mp3",
    showAudioNotification: true,
  },
  {
    id: 1,
    image: "/dashboard.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "This is the PDF-to-Tally button. Click here to check your subscription details and validity.",
    delay: 300,
    audioSrc: "/audio/Step1.mp3",
    highlight: {
      x: 810,    // PDF to Tally button area
      y: 184,    // Near top-right area
      width: 105,
      height: 25
    },
    spotlightTutorial: {
      title: "PDF to Tally Button",
      description: "This is the PDF-to-Tally button. Click here to check your subscription details and validity.",
      position: "left",
    }
  },
  {
    id: 2,
    image: "/tally-settings.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 760,  // Original image height
    instruction: "Subscription detail — check the validity date for this feature before proceeding.",
    delay: 300,
    audioSrc: "/audio/Step2.mp3",
    highlight: {
      x: 140,    // Subscription expiration badge x position
      y: 340,    // Subscription expiration badge y position
      width: 450,
      height: 100
    },
    spotlightTutorial: {
      title: "Subscription detail",
      description: "Here you can check the expiration date for this feature. The current validity shows: valid till 26 Jul 2026.",
      position: "right"
    }
  },
  {
    id: 3,
    image: "/Excel-Open-pdf-Converter.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Launch the cloud-based PDF converter to process your bank statements. Click the \"Open PDF Converter\" button to open the converter.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step3.mp3",
    highlightType: "none",  // Disable tooltip and bubble highlight for this step
    highlight: {
      x: 1015,   // Open PDF Converter button x position
      y: 235,    // Open PDF Converter button y position
      width: 180,
      height: 25
    },
    spotlightTutorial: {
      title: "Open PDF Converter",
      description: "Launch the cloud-based PDF converter to process your bank statements. Click the \"Open PDF Converter\" button to open the converter.",
      position: "left"
    }
  },
  {
    id: 4,
    image: "/Converter-preview.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Select your bank PDF by clicking the 'Browse' button to upload it to the converter.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step4.mp3",
    highlightType: "none",  // Use spotlight overlay instead of bubble highlight
    highlight: {
      x: 212,    // Browse button x position
      y: 203,    // Browse button y position
      width: 65,
      height: 30
    },
    spotlightTutorial: {
      title: "Select Your Bank PDF",
      description: "Click the 'Browse' button to choose your bank PDF and load it into the converter.",
      position: "right"  // Card on the right of the spotlight
    }
  },
  {
    id: 5,
    image: "/file-selection.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Select the highlighted bank PDF file to prepare it for conversion in the following steps.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step5.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 400,    // Bank of Baroda file x position
      y: 355,    // Bank of Baroda file y position
      width: 380,
      height: 26
    },
    spotlightTutorial: {
      title: "Choose the PDF File",
      description: "Select the highlighted bank PDF file to prepare it for conversion in the following steps.",
      position: "right"  // Card on the right of the spotlight
    }
  },
  {
    id: 6,
    image: "/open-pdf-file.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Open the selected bank PDF by clicking the 'Open' button to continue the import flow.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step6.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 272,    // Open button x position
      y: 520,    // Open button y position
      width: 746,
      height: 57
    },
    spotlightTutorial: {
      title: "Open the PDF",
      description: "Click the 'Open' button to load the selected bank PDF and move to the next step.",
      position: "top-right"  // Card above and to the right of the spotlight
    }
  },
  {
    id: 7,
    image: "/import-pdf.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Import the selected bank PDF into the converter by clicking the 'Import' button.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step7.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 205,    // Import button x position
      y: 205,    // Import button y position
      width: 560,
      height: 35
    },
    spotlightTutorial: {
      title: "Import PDF Data",
      description: "Click the 'Import' button to bring the selected bank PDF into the converter.",
      position: "right"  // Card on the right of the spotlight
    }
  },
  {
    id: 8,
    image: "/autodetect-table.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Detect table data automatically by clicking the 'Autodetect Tables' button.",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    audioSrc: "/audio/Step8.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 515,    // Autodetect Tables button x position
      y: 125,    // Autodetect Tables button y position
      width: 130,
      height: 30
    },
    spotlightTutorial: {
      title: "Autodetect Tables",
      description: "Click 'Autodetect Tables' to scan the PDF and extract table data automatically.",
      position: "right"  // Card on the right of the spotlight
    }
  },
  {
    id: 9,
    image: "/step-9-1.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click on 'Please Select Bank' to choose your bank name from the list.",
    delay: 200,
    audioSrc: "/audio/Step9.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 818,    // "Please Select Bank" text x position (300px from right)
      y: 120,    // "Please Select Bank" text y position (100px from top)
      width: 315,
      height: 40
    },
    spotlightTutorial: {
      title: "Select Bank",
      description: "Click on 'Please Select Bank' to choose your bank name from the list.",
      position: "left"  // Card on the left of the spotlight
    }
  },
  {
    id: 10,
    image: "/Select-bank.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Our PDF bank name is Bank of Baroda, so select 'Bank of Baroda Print Format 2' from the list.",
    delay: 200,
    audioSrc: "/audio/Step10.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 815,    // Bank format option x position
      y: 425,    // Bank format option y position
      width: 310,
      height: 20
    },
    spotlightTutorial: {
      title: "Choose Bank Format",
      description: "Our PDF bank name is Bank of Baroda, so select 'Bank of Baroda Print Format 2' from the list.",
      position: "left"  // Card on the left of the spotlight (overlay on the right)
    }
  },
  {
    id: 11,
    image: "/Preview Pdf.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Select Preview Data to proceed. Ensure the selected bank format matches your bank PDF by comparing it with the preview image provided.",
    delay: 200,
    audioSrc: "/audio/Step11.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 580,   // Preview Pdf button x position (top right)
      y: 122,    // Preview Pdf button y position (top right)
      width: 660,
      height: 70
    },
    spotlightTutorial: {
      title: "Preview Data",
      description: "Select Preview Data to proceed. Ensure the selected bank format matches your bank PDF by comparing it with the preview image provided.",
      position: "left"  // Card on the left, overlay on the right
    }
  },
  {
    id: 12,
    image: "/table-data.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click 'Send to Template' to move your bank PDF data into the TallyConnects template for the next steps.",
    delay: 200,
    audioSrc: "/audio/Step12.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 355,    // Send to Template button x position (top center)
      y: 123,    // Send to Template button y position (top center)
      width: 140,
      height: 30
    },
    spotlightTutorial: {
      title: "Send to Template",
      description: "Click 'Send to Template' to move your bank PDF data into the TallyConnects template for the next steps.",
      position: "right"  // Card on the right, spotlight on the left
    }
  },
  {
    id: 13,
    image: "/Close-popup.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click the Close button to exit this popup and move on to reviewing the data in the Excel templates.",
    delay: 200,
    audioSrc: "/audio/Step13.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 815,   // Close button x position (top right corner)
      y: 200,      // Close button y position (top right corner)
      width: 55,
      height: 28
    },
    spotlightTutorial: {
      title: "Close the Popup",
      description: "Click the Close button to dismiss this popup and continue to verify the data in the Excel templates.",
      position: "left"  // Card on the left, overlay on the right
    }
  },
  {
    id: 14,
    image: "/open-excel.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click the Excel icon on your taskbar to open the TallyConnect template, then proceed to the next step to import your data.",
    delay: 200,
    audioSrc: "/audio/Step14.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 635,   // Excel icon x position (taskbar)
      y: 680,   // Excel icon y position (taskbar)
      width: 45,
      height: 28
    },
    spotlightTutorial: {
      title: "Open Excel Template",
      description: "Click the Excel icon on your taskbar to open the TallyConnect template, then proceed to the next step to import your data.",
      position: "top"  // Card on top, spotlight below (overlay bottom)
    }
  },
  {
    id: 15,
    image: "/Import-pdf-data.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click 'Import PDF Bank data' to import your bank PDF data into the Excel template. This action fetches all data and places them into their proper columns.",
    delay: 200,
    audioSrc: "/audio/Step15.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 735,   // Import PDF Bank data button x position
      y: 230,   // Import PDF Bank data button y position
      width: 200,
      height: 35
    },
    spotlightTutorial: {
      title: "Import PDF Bank Data",
      description: "Click 'Import PDF Bank data' to import your bank PDF data into the Excel template. This action fetches all data and places them into their proper columns.",
      position: "left"  // Card on the left, spotlight on the right
    }
  },
  {
    id: 16,
    image: "/Successful-records.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Review how many entries were processed successfully in the template, then click OK to close this confirmation and continue.",
    delay: 500,
    audioSrc: "/audio/Step16.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 540,   // OK button x position
      y: 320,   // OK button y position
      width: 210,
      height: 120
    },
    spotlightTutorial: {
      title: "Successful Records",
      description: "This popup shows how many entries were processed successfully in the template. Click OK to close it and move to the next step.",
      position: "right"  // Card on the right, spotlight on the left
    }
  },
  {
    id: 17,
    image: "/Verify-party-ledger.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "This converter auto-extracts ledger names from your bank PDF descriptions so accounts map correctly. Review the Ledger Name column, then click Next to continue.",
    delay: 200,
    audioSrc: "/audio/Step17.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 10,   // Ledger Name column x position
      y: 335,  // Ledger Name column y position
      width: 1250,
      height: 340
    },
    spotlightTutorial: {
      title: "Ledger Names Auto-Mapped",
      description: "This PDF converter automatically extracts ledger names from your bank PDF based on transaction description details and places them directly into the Ledger Name column.",
      position: "top-right"  // Card on top-right, spotlight below (overlay bottom)
    }
  },
  {
    id: 18,
    image: "/Voucher-type.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Use the Create Receipt/Payment Vouchers button to label each entry as a receipt or payment directly in the template.",
    delay: 200,
    audioSrc: "/audio/Step18.mp3",
    highlightType: "none",  // Use spotlight overlay and instruction card
    highlight: {
      x: 450,   // Create Receipt /Payment Vouchers button x position
      y: 285,   // Create Receipt /Payment Vouchers button y position
      width: 280,
      height: 25
    },
    spotlightTutorial: {
      title: "Mark Receipt/Payment Voucher",
      description: "Click Create Receipt/Payment Vouchers to automatically tag each entry as a receipt or payment based on the credit or debit amount in the template using this advanced feature.",
      position: "right"  // Card on the right, spotlight on the left
    }
  },
  {
    id: 19,
    image: "/Voucher-Created.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "The Receipt and Payment voucher types have been successfully created in the template. The next step is to create the Contra voucher type.",
    delay: 200,
    audioSrc: "/audio/Step19.mp3",
    highlightType: "none",
    highlight: {
      x: 500,   // Voucher created confirmation area x position
      y: 350,   // Voucher created confirmation area y position
      width: 500,
      height: 340
    },
    spotlightTutorial: {
      title: "Receipt/Payment Voucher Created",
      description: "The Receipt and Payment voucher types have been successfully created in the template. The next step is to create the Contra voucher type.",
      position: "left"  // Card on the left, spotlight on the right
    }
  },
  {
    id: 20,
    image: "/Cash-bank.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Receipts and Payments are now created in the template. Next, create a Contra voucher type using the dedicated button.",
    delay: 200,
    audioSrc: "/audio/Step20.mp3",
    highlightType: "none",
    highlight: {
      x: 350,   // Cash/Bank ledger column x position
      y: 280,   // Cash/Bank ledger column y position
      width: 190,
      height: 40
    },
    highlightButton: {
      x: 640,   // Create Contra Voucher button x position
      y: 600,   // Create Contra Voucher button y position
      width: 220,
      height: 40
    },
    spotlightTutorial: {
      title: "Contra Voucher Creation",
      description: "To create a Contra voucher automatically, enter your existing bank or cash ledger in the Ledger Name column of the template, then click Create Contra Voucher to generate the Contra voucher types in the template.",
      position: "top-right"  // Card top-right of the spotlight
    }
  },
  {
    id: 21,
    image: "/Contra-created.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Contra voucher type has been created from the template after clicking Create Contra Voucher.",
    delay: 200,
    audioSrc: "/audio/Step21.mp3",
    highlightType: "none",
    highlight: {
      x: 335,   // Contra voucher created confirmation area x position
      y: 340,   // Contra voucher created confirmation area y position
      width: 430,
      height: 350
    },
    spotlightTutorial: {
      title: "Contra Voucher Created",
      description: "This step confirms the Contra voucher type was generated in the template after clicking Create Contra Voucher, proving the process completed successfully.",
      position: "right"  // Card on the right, spotlight on the left
    }
  },
  {
    id: 22,
    image: "/alert-box.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Bank PDF data is prepared in the Excel template; next we'll import it into TallyPrime.",
    delay: 200,
    audioSrc: "/audio/Step22.mp3",
    highlightType: "none",
    highlight: {
      x: 460,
      y: 260,
      width: 360,
      height: 180,
    },
    spotlightTutorial: {
      title: "Data Ready in Template",
      description: "Your bank statement data is organized in the Excel template. Next, we'll move the same data into TallyPrime with TallyConnects Software.",
      position: "top",
      disableOverlay: true,
    }
  },
  {
    id: 23,
    image: "/Bank-Statement.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Open Bank Statement in TallyConnects to import your prepared PDF template data.",
    delay: 200,
    audioSrc: "/audio/Step23.mp3",
    highlightType: "none",
    highlight: {
      x: 720,   // Bank Statement button area (right side)
      y: 230,   // Bank Statement button y position
      width: 250,
      height: 60
    },
    spotlightTutorial: {
      title: "Open Bank Statement",
      description: "This TallyConnects interface lets you import your bank PDF template. Click Bank Statement on the right to load your prepared data.",
      position: "left"  // Card on the left, overlay on the right
    }
  },
  {
    id: 24,
    image: "/Bank-template-selection.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Choose the Bank PDF statement template and click Open to continue.",
    delay: 200,
    audioSrc: "/audio/Step24.mp3",
    highlightType: "none",
    highlight: {
      x: 110,   // Dialog/content area left side (popup)
      y: 215,
      width: 472,
      height: 328
    },
    spotlightTutorial: {
      title: "Select Bank PDF Template",
      description: "A popup appears after choosing Bank Statement Feature. Select the Bank PDF statement template, then click Open to proceed.",
      position: "right"  // Card on the right, overlay on the left
    }
  },
  {
    id: 25,
    image: "/Is-invoice-yes.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "Click Yes to start importing data from the Excel template into TallyPrime.",
    delay: 200,
    audioSrc: "/audio/Step25.mp3",
    highlightType: "none",
    highlight: {
      x: 280,  // Yes button area (popup)
      y: 210,  // Yes button area y position
      width: 725,
      height: 140
    },
    spotlightTutorial: {
      title: "Confirm Import",
      description: "Click Yes without changing anything. This starts importing the Excel template data into TallyPrime.",
      position: "bottom-right"  // Card on the bottom-right
    }
  },
  {
    id: 26,
    image: "/Success.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "All 166 entries imported to TallyPrime with 0 errors. Continue to review them in TallyPrime.",
    delay: 200,
    audioSrc: "/audio/Step26.mp3",
    highlightType: "none",
    highlight: {
      x: 460,   // Success summary modal area
      y: 120,
      width: 200,
      height: 50
    },
    spotlightTutorial: {
      title: "Import Successful",
      description: "All 166 entries are imported into TallyPrime with zero errors. Proceed to TallyPrime to review these entries.",
      position: "bottom"  // Card below the spotlight
    }
  },
  {
    id: 27,
    image: "/TallyPrime.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "TallyPrime now shows all 166 imported vouchers from TallyConnects. Review the totals in TallyPrime.",
    delay: 200,
    audioSrc: "/audio/Step27.mp3",
    highlightType: "none",
    // Highlight on Total row/box (at bottom) for spotlight overlay
    highlight: {
      x: 5,
      y: 75,
      width: 560,
      height: 620
    },
    spotlightTutorial: {
      title: "Vouchers in TallyPrime",
      description: "All 166 vouchers have been successfully imported into TallyPrime via TallyConnects with zero errors. Review the totals shown here to confirm the import. Every entry from the PDF has been imported through TallyConnects and is now ready to be used in TallyPrime.",
      position: "right"
    }
  }
];

export default demoSteps;
