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
    instruction: "",
    delay: 200,
    highlightType: "none",
    highlight: {
      x: 0,     // No highlight needed for alert message
      y: 0,
      width: 0,
      height: 0
    }
  },
  {
    id: 23,
    image: "/Bank-Statement.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 815,   // Bank Statement button x position (300px to right)
      y: 280,    // Bank Statement button y position
      width: 90,
      height: 30
    }
  },
  {
    id: 24,
    image: "/Bank-template-selection.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    // Bubble highlight (default highlightType) on Open button
    highlight: {
      x: 750,   // Open button x position (estimated)
      y: 515,   // Open button y position (estimated)
      width: 80,
      height: 30
    }
  },
  {
    id: 25,
    image: "/Is-invoice-yes.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    // Bubble highlight (default highlightType) on Yes button
    highlight: {
      x: 845,  // Yes button x position (estimated - right side)
      y: 397,   // Yes button y position (estimated - center)
      width: 70,
      height: 30
    }
  },
  {
    id: 26,
    image: "/Success.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "none",  // No bubble animation for this step
    highlight: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  },
  {
    id: 27,
    image: "/TallyPrime.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    // Highlight on Total row/box (at bottom) for right-side tooltip
    highlight: {
      x: 450,   // Total box x position (left side of the box)
      y: 665,   // Total box y position (bottom of screen)
      width: 100,  // Width of the Total box
      height: 35   // Height of the Total box
    }
  }
];

export default demoSteps;
