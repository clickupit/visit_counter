document.addEventListener('DOMContentLoaded', function () {
    addVisitorLog();
  });
  
async function addVisitorLog() {
      try {
        const response = await fetch('http://nc.api.modularinspire.com/api/post-visitor-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            requestURL: window.location.href
          })
        });

        if (response.status === 201) {
          console.log('Visitor log added successfully');
        } else {
          console.error('Error adding visitor log');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }