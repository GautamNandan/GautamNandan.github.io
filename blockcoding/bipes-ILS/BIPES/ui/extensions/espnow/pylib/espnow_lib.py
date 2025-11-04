"""
ESP-NOW Library for BIPES
Simplified wrapper for ESP-NOW communication
"""

import network
import espnow

class ESPNowManager:
    def __init__(self):
        self.wlan = network.WLAN(network.STA_IF)
        self.wlan.active(True)
        self.esp = espnow.ESPNow()
        self.esp.active(True)
        self.peers = []
    
    def add_peer(self, mac_address):
        """Add a peer by MAC address string (e.g., 'AA:BB:CC:DD:EE:FF')"""
        mac_bytes = bytes.fromhex(mac_address.replace(':', ''))
        self.esp.add_peer(mac_bytes)
        self.peers.append(mac_bytes)
        print(f"Added peer: {mac_address}")
    
    def send(self, message, peer_index=0):
        """Send message to a peer by index"""
        if peer_index < len(self.peers):
            self.esp.send(self.peers[peer_index], message)
            return True
        return False
    
    def send_to_all(self, message):
        """Broadcast message to all peers"""
        for peer in self.peers:
            self.esp.send(peer, message)
    
    def receive(self, timeout=1000):
        """Receive message with timeout (ms)"""
        return self.esp.recv(timeout)
    
    def get_mac(self):
        """Get this device's MAC address"""
        mac = self.wlan.config('mac')
        return ':'.join(['%02X' % b for b in mac])

# Global instance
espnow_manager = ESPNowManager()

# Helper functions for blocks
def espnow_init():
    global espnow_manager
    espnow_manager = ESPNowManager()
    print("ESP-NOW initialized")
    print(f"MAC Address: {espnow_manager.get_mac()}")

def espnow_add_peer(mac):
    espnow_manager.add_peer(mac)

def espnow_send(message, peer=0):
    return espnow_manager.send(str(message), peer)

def espnow_receive(timeout=1000):
    result = espnow_manager.receive(timeout)
    if result:
        mac, msg = result
        return msg.decode('utf-8')
    return None

def espnow_get_mac():
    return espnow_manager.get_mac()