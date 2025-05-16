// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native';
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import * as Speech from 'expo-speech';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { analyzeQRContent } from '../utils/groqApi';

// const { width } = Dimensions.get('window');
// const SCAN_AREA_SIZE = width * 0.7;

// const ScannerScreen = () => {
//     const [facing, setFacing] = useState('back');
//     const [permission, requestPermission] = useCameraPermissions();
//     const [scanned, setScanned] = useState(false);
//     const [isAnalyzing, setIsAnalyzing] = useState(false);
//     const [analysisResult, setAnalysisResult] = useState('');
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);

//     const pickImage = async () => {
//         try {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [1, 1],
//                 quality: 1,
//             });

//             if (!result.canceled) {
//                 setSelectedImage(result.assets[0].uri);
//                 // Here you would typically use a QR code reading library to extract the QR code data
//                 // For now, we'll just pass the image URI as an example
//                 handleQRCodeFromImage(result.assets[0].uri);
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             setAnalysisResult('Error selecting image. Please try again.');
//         }
//     };

//     const handleQRCodeFromImage = async (imageUri) => {
//         try {
//             setIsAnalyzing(true);
//             setScanned(true);
//             // In a real implementation, you would use a QR code reading library here
//             // For now, we'll just pass a placeholder message
//             const qrContent = "Sample QR Code content from image";
//             const analysis = await analyzeQRContent(qrContent);
//             setAnalysisResult(analysis || 'No analysis available for this QR code.');
//         } catch (error) {
//             console.error('Error analyzing QR code from image:', error);
//             setAnalysisResult(error.message || 'Error analyzing QR code. Please try again.');
//         } finally {
//             setIsAnalyzing(false);
//         }
//     };

//     if (!permission) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <Ionicons name="camera-outline" size={48} color="#007AFF" />
//                 <Text style={styles.infoText}>Requesting camera permission...</Text>
//             </View>
//         );
//     }

//     if (!permission.granted) {
//         return (
//             <View style={styles.centeredContainer}>
//                 <Ionicons name="camera-off-outline" size={48} color="#FF3B30" />
//                 <Text style={styles.infoText}>We need your permission to access the camera</Text>
//                 <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
//                     <Text style={styles.permissionButtonText}>Grant Permission</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     const handleBarCodeScanned = async ({ data }) => {
//         try {
//             setScanned(true);
//             setIsAnalyzing(true);
//             setAnalysisResult('');
//             setSelectedImage(null);
            
//             console.log('Scanned QR Code content:', data);
            
//             const analysis = await analyzeQRContent(data);
//             console.log('Analysis result:', analysis);
            
//             setAnalysisResult(analysis || 'No analysis available for this QR code.');
//         } catch (error) {
//             console.error('Scan analysis error:', error);
//             setAnalysisResult(error.message || 'Error analyzing QR code. Please try again.');
//         } finally {
//             setIsAnalyzing(false);
//         }
//     };

//     const speakText = async () => {
//         if (analysisResult && !isSpeaking) {
//             setIsSpeaking(true);
//             try {
//                 await Speech.speak(analysisResult, {
//                     onDone: () => setIsSpeaking(false),
//                     onError: () => setIsSpeaking(false),
//                 });
//             } catch (error) {
//                 console.error('Error speaking text:', error);
//                 setIsSpeaking(false);
//             }
//         }
//     };

//     const toggleCameraFacing = () => {
//         setFacing(current => (current === 'back' ? 'front' : 'back'));
//     };

//     const resetScan = () => {
//         setScanned(false);
//         setAnalysisResult('');
//         setSelectedImage(null);
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.cameraContainer}>
//                 {!scanned && !selectedImage && (
//                     <CameraView
//                         style={styles.camera}
//                         facing={facing}
//                         onBarCodeScanned={handleBarCodeScanned}
//                         barCodeScannerSettings={{
//                             barCodeTypes: ['qr'],
//                         }}
//                     >
//                         <View style={styles.overlay}>
//                             <View style={styles.scanArea}>
//                                 <View style={styles.scanBox} />
//                                 <View style={styles.scanCorner} />
//                                 <View style={[styles.scanCorner, styles.topRight]} />
//                                 <View style={[styles.scanCorner, styles.bottomLeft]} />
//                                 <View style={[styles.scanCorner, styles.bottomRight]} />
//                             </View>
//                             <Text style={styles.scanText}>Position QR code within frame</Text>
//                         </View>
//                     </CameraView>
//                 )}
//                 {selectedImage && (
//                     <View style={styles.imagePreviewContainer}>
//                         <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
//                     </View>
//                 )}
//             </View>

//             <View style={styles.infoContainer}>
//                 <View style={styles.resultCard}>
//                     {isAnalyzing ? (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size="large" color="#007AFF" />
//                             <Text style={styles.loadingText}>Analyzing QR code...</Text>
//                         </View>
//                     ) : (
//                         <TextInput
//                             style={styles.textInput}
//                             multiline
//                             value={analysisResult}
//                             placeholder="Scan a QR code or upload an image to see analysis..."
//                             placeholderTextColor="#9CA3AF"
//                             editable={false}
//                         />
//                     )}
//                 </View>

//                 <View style={styles.buttonRow}>
//                     <TouchableOpacity
//                         style={[styles.button, scanned ? styles.scanAgainButton : styles.scanningButton]}
//                         onPress={resetScan}
//                     >
//                         <Ionicons
//                             name={scanned ? 'scan' : 'scan-outline'}
//                             size={24}
//                             color="white"
//                         />
//                         <Text style={styles.buttonText}>
//                             {scanned ? 'Scan Again' : 'Scanning...'}
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.button, styles.uploadButton]}
//                         onPress={pickImage}
//                     >
//                         <Ionicons
//                             name="image-outline"
//                             size={24}
//                             color="white"
//                         />
//                         <Text style={styles.buttonText}>Upload</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[
//                             styles.button,
//                             !analysisResult || isSpeaking ? styles.disabledButton : styles.speakButton,
//                         ]}
//                         onPress={speakText}
//                         disabled={!analysisResult || isSpeaking}
//                     >
//                         <Ionicons
//                             name={isSpeaking ? 'volume-high' : 'volume-medium-outline'}
//                             size={24}
//                             color="white"
//                         />
//                         <Text style={styles.buttonText}>
//                             {isSpeaking ? 'Speaking...' : 'Speak'}
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity 
//                         style={[styles.button, styles.flipButton]} 
//                         onPress={toggleCameraFacing}
//                     >
//                         <Ionicons name="camera-reverse-outline" size={24} color="white" />
//                         <Text style={styles.buttonText}>Flip</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//     },
//     centeredContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//         padding: 20,
//     },
//     loadingContainer: {
//         padding: 20,
//         alignItems: 'center',
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#4B5563',
//     },
//     infoText: {
//         fontSize: 16,
//         color: '#4B5563',
//         marginTop: 16,
//         textAlign: 'center',
//     },
//     permissionButton: {
//         marginTop: 20,
//         backgroundColor: '#007AFF',
//         paddingHorizontal: 20,
//         paddingVertical: 12,
//         borderRadius: 12,
//     },
//     permissionButtonText: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     cameraContainer: {
//         flex: 1,
//         overflow: 'hidden',
//     },
//     camera: {
//         flex: 1,
//     },
//     imagePreviewContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#000',
//     },
//     imagePreview: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'contain',
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     scanArea: {
//         width: SCAN_AREA_SIZE,
//         height: SCAN_AREA_SIZE,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     scanBox: {
//         width: '100%',
//         height: '100%',
//         borderWidth: 2,
//         borderColor: '#ffffff',
//         backgroundColor: 'transparent',
//     },
//     scanCorner: {
//         position: 'absolute',
//         width: 20,
//         height: 20,
//         borderColor: '#007AFF',
//         borderTopWidth: 4,
//         borderLeftWidth: 4,
//         top: -2,
//         left: -2,
//     },
//     topRight: {
//         right: -2,
//         left: undefined,
//         borderLeftWidth: 0,
//         borderRightWidth: 4,
//     },
//     bottomLeft: {
//         top: undefined,
//         bottom: -2,
//         borderTopWidth: 0,
//         borderBottomWidth: 4,
//     },
//     bottomRight: {
//         top: undefined,
//         left: undefined,
//         right: -2,
//         bottom: -2,
//         borderTopWidth: 0,
//         borderLeftWidth: 0,
//         borderRightWidth: 4,
//         borderBottomWidth: 4,
//     },
//     scanText: {
//         position: 'absolute',
//         bottom: -40,
//         fontSize: 16,
//         color: '#ffffff',
//         textAlign: 'center',
//         width: '100%',
//     },
//     infoContainer: {
//         padding: 16,
//         backgroundColor: '#ffffff',
//     },
//     resultCard: {
//         backgroundColor: '#F9FAFB',
//         borderRadius: 12,
//         padding: 12,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3.84,
//         elevation: 5,
//         minHeight: 120,
//     },
//     textInput: {
//         height: 100,
//         fontSize: 16,
//         color: '#374151',
//         textAlignVertical: 'top',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     button: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 12,
//         borderRadius: 12,
//         marginHorizontal: 4,
//     },
//     scanAgainButton: {
//         backgroundColor: '#10B981',
//     },
//     scanningButton: {
//         backgroundColor: '#3B82F6',
//     },
//     uploadButton: {
//         backgroundColor: '#6366F1',
//     },
//     speakButton: {
//         backgroundColor: '#8B5CF6',
//     },
//     flipButton: {
//         backgroundColor: '#EC4899',
//     },
//     disabledButton: {
//         backgroundColor: '#D1D5DB',
//     },
//     buttonText: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         marginLeft: 4,
//     },
// });

// export default ScannerScreen;

import { View, Text } from 'react-native'
import React from 'react'

const ScannerScreen = () => {
  return (
    <View>
      <Text>ScannerScreen</Text>
    </View>
  )
}

export default ScannerScreen