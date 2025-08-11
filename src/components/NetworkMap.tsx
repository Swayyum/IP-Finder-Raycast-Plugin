// Copyright © 2025 Sam Analytic Solutions
// All rights reserved.

import React from "react";

interface DeviceInfo {
  ip: string;
  mac?: string;
  manufacturer?: string;
  hostname?: string;
  openPorts?: number[];
  isOnline: boolean;
  lastSeen: Date;
}

interface NetworkMapProps {
  devices: DeviceInfo[];
  localIP: string;
  layout: "hierarchical" | "radial" | "grid";
  colorScheme: string;
  theme: "light" | "dark";
}

const getDeviceIcon = (device: DeviceInfo): string => {
  if (device.ip === device.hostname) return "🖥️"; // Router/Gateway
  if (device.manufacturer?.toLowerCase().includes("apple")) return "🍎";
  if (device.manufacturer?.toLowerCase().includes("samsung")) return "📱";
  if (
    device.manufacturer?.toLowerCase().includes("hp") ||
    device.manufacturer?.toLowerCase().includes("hewlett")
  )
    return "🖨️";
  if (device.manufacturer?.toLowerCase().includes("canon")) return "📷";
  if (device.openPorts?.includes(80) || device.openPorts?.includes(443))
    return "🌐";
  if (device.openPorts?.includes(22)) return "🔧";
  return "💻";
};

const getDeviceType = (device: DeviceInfo): string => {
  if (device.ip === device.hostname) return "Router";
  if (device.manufacturer?.toLowerCase().includes("apple"))
    return "Apple Device";
  if (device.manufacturer?.toLowerCase().includes("samsung"))
    return "Samsung Device";
  if (
    device.manufacturer?.toLowerCase().includes("hp") ||
    device.manufacturer?.toLowerCase().includes("hewlett")
  )
    return "Printer";
  if (device.manufacturer?.toLowerCase().includes("canon"))
    return "Camera/Printer";
  if (device.openPorts?.includes(80) || device.openPorts?.includes(443))
    return "Web Server";
  if (device.openPorts?.includes(22)) return "SSH Server";
  return "Computer";
};

export const NetworkMap: React.FC<NetworkMapProps> = ({
  devices,
  localIP,
  layout,
  colorScheme,
  theme,
}) => {
  if (devices.length === 0) {
    return (
      <div>
        <h2>Network Topology Map</h2>
        <p>No devices found. Run a network scan to see the topology.</p>
      </div>
    );
  }

  const onlineDevices = devices.filter((d) => d.isOnline).length;
  const totalDevices = devices.length;
  const routerDevices = devices.filter(
    (d) => d.ip === localIP.split(".").slice(0, 3).join(".") + ".1",
  ).length;

  return (
    <div>
      <h2>Network Topology Map</h2>
      <p>Found {totalDevices} devices ({onlineDevices} online)</p>
      
      <div style={{ marginTop: "16px" }}>
        <h3>Devices:</h3>
        {devices.map((device) => {
          const isLocalDevice = device.ip === localIP;
          const icon = getDeviceIcon(device);
          const type = getDeviceType(device);
          const status = device.isOnline ? "🟢 Online" : "🔴 Offline";
          
          return (
            <div key={device.ip} style={{ 
              padding: "8px", 
              margin: "4px 0", 
              border: "1px solid #ccc", 
              borderRadius: "4px",
              backgroundColor: isLocalDevice ? "#e3f2fd" : "#f5f5f5"
            }}>
              <strong>{icon} {device.ip}</strong> - {type} {status}
              {device.hostname && device.hostname !== device.ip && (
                <div>Hostname: {device.hostname}</div>
              )}
              {device.mac && <div>MAC: {device.mac}</div>}
              {isLocalDevice && <div>📍 Local Device</div>}
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: "16px" }}>
        <h3>Network Statistics:</h3>
        <ul>
          <li>Total Devices: {totalDevices}</li>
          <li>Online Devices: {onlineDevices}</li>
          <li>Router Devices: {routerDevices}</li>
          <li>Layout: {layout}</li>
          <li>Color Scheme: {colorScheme}</li>
          <li>Theme: {theme}</li>
        </ul>
      </div>
    </div>
  );
};
