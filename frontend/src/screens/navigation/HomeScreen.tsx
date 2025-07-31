import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Pressable, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, route }: any) {
  const [sessionActive, setSessionActive] = useState(false);
  const [screensScanned, setScreensScanned] = useState(0);
  const [reparable, setReparable] = useState(0);
  const [beyondRepair, setBeyondRepair] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [manualInputVisible, setManualInputVisible] = useState(false);

  // Get user data from navigation params
  const user = route.params?.user || {
    name: 'Unknown',
    surname: 'User',
    department: 'Unknown Department',
    task: 'Unknown Task',
    avatar: '👨‍🔧'
  };

  const generateRandomBarcode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleStartTask = () => {
    setSessionActive(true);
    setScreensScanned(0);
    setReparable(0);
    setBeyondRepair(0);
    setStartTime(new Date());
    setEndTime(null);
    setScanning(true);
    Alert.alert('Task Started', 'Choose your scanning method.');
  };

  const handleScanScreen = () => {
    const barcode = generateRandomBarcode();
    setScannedBarcode(barcode);
    setStatusModalVisible(true);
  };

  const handleManualBarcode = () => {
    if (manualBarcode.trim()) {
      setScannedBarcode(manualBarcode.trim());
      setManualInputVisible(false);
      setManualBarcode('');
      setStatusModalVisible(true);
    } else {
      Alert.alert('Error', 'Please enter a barcode');
    }
  };

  const handleStatusSelect = (status: 'Reparable' | 'Beyond Repair') => {
    setScreensScanned(screensScanned + 1);
    if (status === 'Reparable') setReparable(reparable + 1);
    else setBeyondRepair(beyondRepair + 1);
    // TODO: Send scan data to backend
    setStatusModalVisible(false);
    Alert.alert('Screen Scanned', `Barcode: ${scannedBarcode}\nStatus: ${status}\n\nReady for next scan.`);
  };

  const handleStopTask = () => {
    setSessionActive(false);
    setEndTime(new Date());
    setScanning(false);
    setStatusModalVisible(false);
    setManualInputVisible(false);
    // TODO: Send stop session to backend and navigate to summary
    Alert.alert('Session Ended', `Total screens: ${screensScanned}\nReparable: ${reparable}\nBeyond Repair: ${beyondRepair}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.avatar}</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name} {user.surname}</Text>
            <Text style={styles.userDepartment}>{user.department} • {user.task}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="scan-outline" size={24} color="#007AFF" />
          <Text style={styles.statNumber}>{screensScanned}</Text>
          <Text style={styles.statLabel}>Screens Scanned</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#28a745" />
          <Text style={styles.statNumber}>{reparable}</Text>
          <Text style={styles.statLabel}>Reparable</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="close-circle-outline" size={24} color="#dc3545" />
          <Text style={styles.statNumber}>{beyondRepair}</Text>
          <Text style={styles.statLabel}>Beyond Repair</Text>
        </View>
      </View>

      {/* Session Status */}
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <Ionicons 
            name={sessionActive ? "play-circle" : "pause-circle"} 
            size={24} 
            color={sessionActive ? "#28a745" : "#666"} 
          />
          <Text style={[styles.sessionStatus, { color: sessionActive ? "#28a745" : "#666" }]}>
            Session: {sessionActive ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      {!sessionActive ? (
        <TouchableOpacity style={styles.startButton} onPress={handleStartTask}>
          <Ionicons name="play" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Start Task</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.scannerContainer}>
          <View style={styles.scannerCard}>
            <Ionicons name="scan" size={48} color="#007AFF" style={styles.scannerIcon} />
            <Text style={styles.scannerTitle}>Scanner Options</Text>
            <Text style={styles.scannerSubtitle}>Choose your scanning method</Text>
            
            <TouchableOpacity style={styles.scanButton} onPress={handleScanScreen}>
              <Ionicons name="qr-code-outline" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Simulate Scan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.manualButton} onPress={() => setManualInputVisible(true)}>
              <Ionicons name="keypad-outline" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Manual Entry</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.stopButton} onPress={handleStopTask}>
            <Ionicons name="stop" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Stop Task</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Manual Barcode Input Modal */}
      <Modal
        visible={manualInputVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setManualInputVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Barcode</Text>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Enter barcode number"
              value={manualBarcode}
              onChangeText={setManualBarcode}
              autoFocus
              keyboardType="numeric"
            />
            <View style={styles.modalButtonRow}>
              <Pressable style={[styles.modalButton, { backgroundColor: '#6c757d' }]} onPress={() => setManualInputVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: '#007AFF' }]} onPress={handleManualBarcode}>
                <Text style={styles.modalButtonText}>Scan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Status Selection Modal */}
      <Modal
        visible={statusModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Screen Status</Text>
            <Text style={styles.modalBarcode}>Barcode: {scannedBarcode}</Text>
            <Text style={styles.modalPrompt}>Is this screen Reparable or Beyond Repair?</Text>
            <View style={styles.modalButtonRow}>
              <Pressable style={[styles.modalButton, { backgroundColor: '#28a745' }]} onPress={() => handleStatusSelect('Reparable')}>
                <Text style={styles.modalButtonText}>Reparable</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: '#dc3545' }]} onPress={() => handleStatusSelect('Beyond Repair')}>
                <Text style={styles.modalButtonText}>Beyond Repair</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: '#e9ecef',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  userDepartment: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 24,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  scannerContainer: {
    paddingHorizontal: 24,
  },
  scannerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scannerIcon: {
    marginBottom: 16,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  scannerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
  },
  manualButton: {
    backgroundColor: '#ffc107',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  stopButton: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#dc3545',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  modalBarcode: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  modalPrompt: {
    fontSize: 16,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  barcodeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
