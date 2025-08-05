# Frontend App with Camera Scanner

This React Native app includes a comprehensive camera scanner for barcode and QR code scanning functionality.

## Features

### Camera Scanner
- **Real-time barcode/QR code scanning** using the device camera
- **Multiple barcode format support** including:
  - QR Code
  - Code 128
  - Code 39
  - EAN-13
  - EAN-8
  - UPC-A
  - UPC-E

### Scanning Options
1. **Camera Scanner**: Opens the device camera to scan real barcodes/QR codes
2. **Simulate Scan**: Generates a random barcode for testing purposes
3. **Manual Entry**: Allows manual input of barcode numbers

### User Interface
- **Modern UI** with clean, intuitive design
- **Visual scanning frame** with corner indicators
- **Permission handling** with user-friendly error messages
- **Session management** with start/stop functionality
- **Real-time statistics** tracking scanned items

## Technical Implementation

### Dependencies
- `expo-camera`: For real-time QR code and barcode scanning
- `expo-barcode-scanner`: For camera access (configured for future use)
- `@expo/vector-icons`: For UI icons

**Note**: We're using `expo-camera` for QR code scanning as it provides the most reliable and stable barcode scanning functionality.

### Permissions
The app requires camera permissions which are automatically requested when the scanner is opened.

### Navigation
The camera scanner is integrated into the main navigation flow:
- Login → Register → Home → Camera Scanner

## Usage

1. **Start a Session**: Tap "Start New Session" on the home screen
2. **Choose Scanning Method**:
   - Tap "Scan with Camera" to use the device camera
   - Tap "Simulate Scan" for testing with random barcodes
   - Tap "Manual Entry" to type barcode numbers
3. **Scan Barcode**: Position the barcode/QR code within the scanning frame
4. **Select Status**: Choose whether the item is "Reparable" or "Beyond Repair"
5. **Continue Scanning**: Repeat for additional items
6. **End Session**: Tap "End Session" when finished

## Development

### Running the App
```bash
cd frontend
npm start
```

### Running the Backend
```bash
cd backend
npm start
```

### Testing Camera Scanner
- Use the "Simulate Scan" option for testing without physical barcodes
- Use the "Manual Entry" option to test with specific barcode numbers
- Use the "Scan with Camera" option with real barcodes/QR codes

### Camera Permissions
The app will request camera permissions when the scanner is first opened. If permissions are denied, users can enable them in device settings.

## File Structure

```
frontend/src/screens/
├── CameraScanner.tsx          # Camera scanner component
├── LoginScreen.tsx            # Login screen
├── RegisterScreen.tsx         # Registration screen
└── navigation/
    ├── AuthNavigator.tsx      # Navigation configuration
    └── HomeScreen.tsx         # Main dashboard with scanning options
```

## Troubleshooting

### Camera Not Working
1. Ensure camera permissions are granted
2. Check that the device has a camera
3. Try restarting the app

### Scanner Not Detecting Barcodes
1. Ensure good lighting conditions
2. Hold the device steady
3. Position the barcode within the scanning frame
4. Try different barcode formats

### Network Errors
If you see "Failed to fetch operations" or "Failed to log operation" errors:
1. Make sure the backend server is running (`cd backend && npm start`)
2. Check that the API_BASE_URL in HomeScreen.tsx is correct
3. Ensure your device can reach the backend server IP address

### App Crashes
1. Check that all dependencies are installed
2. Ensure Expo SDK version is compatible
3. Clear app cache and restart

### QR Code Scanning
The app now supports real-time QR code scanning using the device camera. The scanner can detect various barcode formats including QR codes, Code 128, Code 39, EAN-13, EAN-8, UPC-A, and UPC-E.

## Current Status

✅ **Camera Scanner**: Fully working with real QR code scanning
✅ **Permission Handling**: Properly requests and handles camera permissions
✅ **Integration**: Seamlessly integrates with existing workflow
✅ **UI/UX**: Professional interface with scanning frame and controls
⚠️ **Backend**: Network errors may occur if backend is not running 