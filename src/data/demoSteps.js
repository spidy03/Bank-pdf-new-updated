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
    audioSrc: "/audio/step1-welcome-narration.mp3",
    showAudioNotification: true,
  },
  {
    id: 1,
    image: "/dashboard.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 1000,  // 1 second delay before showing spotlight for smooth transition
    highlight: {
      x: 810,    // PDF to Tally button area
      y: 184,    // Near top-right area
      width: 105,
      height: 25
    },
    spotlightTutorial: {
      title: "PDF to Tally Button",
      description: "This is the PDF to Tally button. Click here to check your subscription details and access the PDF import feature for seamless data transfer into Tally.",
      position: "left",
    }
  },
  {
    id: 2,
    image: "/tally-settings.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 760,  // Original image height
    instruction: "",
    delay: 0,
    highlight: {
      x: 665,    // Excel sheet icon x position (on taskbar)
      y: 710,     // Excel sheet icon y position (on taskbar)
      width: 50,
      height: 50
    },
    expirationHighlight: {
      x: 168,    // Expiration Date field x position
      y: 242,    // Expiration Date field y position
      width: 160,
      height: 25
    }
  },
  {
    id: 3,
    image: "/Excel-Open-pdf-Converter.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlight: {
      x: 1045,   // Open PDF Converter button x position
      y: 235,    // Open PDF Converter button y position
      width: 120,
      height: 25
    },
    tooltipSettings: {
      position: "below",  // Tooltip below the button
      arrowDirection: "up"  // Arrow pointing up towards button
    }
  },
  {
    id: 4,
    image: "/Converter-preview.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlight: {
      x: 212,    // Browse button x position
      y: 203,    // Browse button y position
      width: 65,
      height: 35
    },
    tooltipSettings: {
      position: "right",  // Tooltip left of the button
      arrowDirection: "right"  // Arrow pointing right towards button
    }
  },
  {
    id: 5,
    image: "/file-selection.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlightType: "border",  // Using new border-highlight module
    highlight: {
      x: 400,    // Bank of Baroda file x position
      y: 355,    // Bank of Baroda file y position
      width: 380,
      height: 26
    },
    tooltipSettings: {
      position: "right",  // Tooltip right of the border
      arrowDirection: "left"  // Arrow pointing left towards border
    }
  },
  {
    id: 6,
    image: "/open-pdf-file.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlight: {
      x: 855,    // Open button x position
      y: 550,    // Open button y position
      width: 80,
      height: 30
    },
    tooltipSettings: {
      position: "below",  // Tooltip below the button
      arrowDirection: "up"  // Arrow pointing up towards button
    }
  },
  {
    id: 7,
    image: "/import-pdf.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlight: {
      x: 700,    // Import button x position
      y: 200,    // Import button y position
      width: 65,
      height: 35
    },
    tooltipSettings: {
      position: "right",  // Tooltip right of the button
      arrowDirection: "left"  // Arrow pointing left towards button
    }
  },
  {
    id: 8,
    image: "/autodetect-table.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,  // 0.2 second delay to allow image to load before showing animation
    highlight: {
      x: 550,    // Autodetect Tables button x position
      y: 125,    // Autodetect Tables button y position
      width: 75,
      height: 30
    },
    tooltipSettings: {
      position: "below",  // Tooltip below the button
      arrowDirection: "up"  // Arrow pointing up towards button
    }
  },
  {
    id: 9,
    image: "/step-9-1.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "border",  // Using border-highlight for "Please Select Bank"
    highlight: {
      x: 810,    // "Please Select Bank" text x position (300px from right)
      y: 120,    // "Please Select Bank" text y position (100px from top)
      width: 330,
      height: 40
    }
  },
  {
    id: 10,
    image: "/Select-bank.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "border",  // Using border-highlight for the transaction row
    highlight: {
      x: 810,    // Red highlighted transaction area x position
      y: 420,    // Red highlighted transaction area y position
      width: 330,
      height: 30
    }
  },
  {
    id: 11,
    image: "/Preview Pdf.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 1155,   // Preview Pdf button x position (top right)
      y: 122,    // Preview Pdf button y position (top right)
      width: 70,
      height: 35
    }
  },
  {
    id: 12,
    image: "/table-data.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 385,    // Send to Template button x position (top center)
      y: 128,    // Send to Template button y position (top center)
      width: 80,
      height: 28
    }
  },
  {
    id: 13,
    image: "/Close-popup.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 815,   // Close button x position (top right corner)
      y: 200,      // Close button y position (top right corner)
      width: 45,
      height: 28
    }
  },
  {
    id: 14,
    image: "/open-excel.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 635,   // Open Excel Sheet button x position
      y: 685,   // Open Excel Sheet button y position
      width: 45,
      height: 28
    }
  },
  {
    id: 15,
    image: "/Import-pdf-data.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 775,   // Import PDF Bank data button x position
      y: 230,   // Import PDF Bank data button y position
      width: 120,
      height: 25
    }
  },
  {
    id: 16,
    image: "/Successful-records.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 500,
    highlight: {
      x: 690,   // OK button x position
      y: 420,   // OK button y position
      width: 45,
      height: 25
    }
  },
  {
    id: 17,
    image: "/Verify-party-ledger.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightLeft: {
      x: 290,   // Description column x position
      y: 425,   // Description column y position
      width: 250,
      height: 280
    },
    highlightRight: {
      x: 1080,  // Ledger Name column x position
      y: 425,   // Ledger Name column y position
      width: 250,
      height: 280
    }
  },
  {
    id: 18,
    image: "/Voucher-type.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlight: {
      x: 518,   // Create Receipt /Payment Vouchers button x position
      y: 285,   // Create Receipt /Payment Vouchers button y position
      width: 135,
      height: 25
    }
  },
  {
    id: 19,
    image: "/Voucher-Created.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "none",
    highlight: {
      x: 500,   // Voucher created confirmation area x position
      y: 350,   // Voucher created confirmation area y position
      width: 280,
      height: 80
    }
  },
  {
    id: 20,
    image: "/Cash-bank.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "none",
    highlight: {
      x: 650,   // Cash/Bank ledger column x position
      y: 350,   // Cash/Bank ledger column y position
      width: 200,
      height: 200
    },
    highlightButton: {
      x: 640,   // Create Contra Voucher button x position
      y: 600,   // Create Contra Voucher button y position
      width: 220,
      height: 40
    }
  },
  {
    id: 21,
    image: "/Contra-created.png",
    imageWidth: 1280,  // Original image width
    imageHeight: 720,  // Original image height
    instruction: "",
    delay: 200,
    highlightType: "none",
    highlight: {
      x: 700,   // Contra voucher created confirmation area x position
      y: 350,   // Contra voucher created confirmation area y position
      width: 200,
      height: 150
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
