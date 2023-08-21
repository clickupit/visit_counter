import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [visitorData, setVisitorData] = useState({
        ipCount: 0,
        osCounts: {},
        browserCounts: {},
    });

    useEffect(() => {

        axios.get('http://nc.api.modularinspire.com/api/get-visitor-all')
            .then((response) => {
                const logs = response.data;
                const ipSet = new Set();
                const osCounts = {};
                const browserCounts = {};

                logs.forEach((log) => {
                    ipSet.add(log.clientIP);
                    osCounts[log.clientDevice] = (osCounts[log.clientDevice] || 0) + 1;
                    browserCounts[log.clientBrowser] = (browserCounts[log.clientBrowser] || 0) + 1;
                });

                setVisitorData({
                    ipCount: ipSet.size,
                    osCounts: osCounts,
                    browserCounts: browserCounts,
                });
            })
            .catch((error) => {
                console.error('Error fetching visitor data:', error);
            });
    }, []);

    return (
        <div>
            <h3>Visitor Statistics</h3>
            <div>
                <p>Unique IP : {visitorData.ipCount} IPs</p>
            </div>
            <div>
                <h3>OS/Device Statistics:</h3>
                {Object.keys(visitorData.osCounts).map((os, index) => (
                    <p>{os} : {visitorData.osCounts[os]} Times</p>
                ))}
            </div>
            <div>
                <h3>Browser Statistics:</h3>
                {Object.keys(visitorData.browserCounts).map((browser, index) => (
                    <p>{browser}: {visitorData.browserCounts[browser]} Times</p>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
