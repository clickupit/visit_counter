import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // เพิ่มเข้ามา

function Dashboard() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [visitorData, setVisitorData] = useState({
        ipCount: 0,
        osCounts: {},
        browserCounts: {},
        allLogs: [],
    });
    const [urlCounts, setUrlCounts] = useState({});

    useEffect(() => {
        axios.get('http://nc.api.modularinspire.com/api/get-visitor-all')
            .then((response) => {
                const logs = response.data;
                const ipSet = new Set();
                const osCounts = {};
                const browserCounts = {};
                const urlCounts = {};

                const filteredLogs = logs.filter((log) => {
                    const logTimestamp = new Date(log.timeStamp).getTime();
                    const startTimestamp = startDate ? new Date(startDate).getTime() : new Date(log.timeStamp).getTime();
                    const endTimestamp = endDate ? new Date(endDate).getTime() : new Date(log.timeStamp).getTime();
                    return logTimestamp >= startTimestamp && logTimestamp <= endTimestamp;
                });

                filteredLogs.forEach((log) => {
                    ipSet.add(log.clientIP);
                    osCounts[log.clientDevice] = (osCounts[log.clientDevice] || 0) + 1;
                    browserCounts[log.clientBrowser] = (browserCounts[log.clientBrowser] || 0) + 1;
                    urlCounts[log.requestURL] = (urlCounts[log.requestURL] || 0) + 1;
                });

                setVisitorData({
                    ipCount: ipSet.size,
                    osCounts: osCounts,
                    browserCounts: browserCounts,
                    allLogs: filteredLogs,
                });

                setUrlCounts(urlCounts);
            })
            .catch((error) => {
                console.error('Error fetching visitor data:', error);
            });
    }, [startDate, endDate]);

    return (
        <div className="container mt-4">
            <h3>Filter by Date and Time</h3>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="startDate">Start Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="endDate">End Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <h3 className="mt-4">Visitor Statistics</h3>
            <div>
                <p>Unique IP : {visitorData.ipCount} IPs</p>
            </div>
            <div className="mt-4">
                <h3>OS/Device Statistics:</h3>
                {Object.keys(visitorData.osCounts).map((os, index) => (
                    <p key={index}>{os} : {visitorData.osCounts[os]} Times</p>
                ))}
            </div>
            <div className="mt-4">
                <h3>Browser Statistics:</h3>
                {Object.keys(visitorData.browserCounts).map((browser, index) => (
                    <p key={index}>{browser}: {visitorData.browserCounts[browser]} Times</p>
                ))}
            </div>
            <div className="mt-4">
                <h3>URL Statistics:</h3>
                {Object.keys(urlCounts).map((url, index) => (
                    <p key={index}>{url}: {urlCounts[url]} Times</p>
                ))}
            </div>
            <div className="mt-4">
                <h3>All Visitor Logs:</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>IP</th>
                            <th>Request URL</th>
                            <th>Device</th>
                            <th>Browser</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitorData.allLogs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.clientIP}</td>
                                <td>{log.requestURL}</td>
                                <td>{log.clientDevice}</td>
                                <td>{log.clientBrowser}</td>
                                <td>{new Date(log.timeStamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
