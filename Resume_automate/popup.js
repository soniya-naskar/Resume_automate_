document.getElementById('resumeFiller').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const resumeData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      linkedin: document.getElementById('linkedin').value,
      website: document.getElementById('website').value,
      experience: document.getElementById('experience').value,
      education: document.getElementById('education').value
    };
    
    chrome.storage.sync.set({ resumeData }, () => {
      alert('Resume data saved.');
    });
  });
  
  document.getElementById('reset').addEventListener('click', () => {
    chrome.storage.sync.remove('resumeData', () => {
      alert('Resume data reset.');
      document.getElementById('resumeFiller').reset();
    });
  }); 
  
  document.getElementById('fill').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['resumeData'], (result) => {
      const resumeData = result.resumeData || {};
      
      document.getElementById('name').value = resumeData.name || '';
      document.getElementById('email').value = resumeData.email || '';
      document.getElementById('phone').value = resumeData.phone || '';
      document.getElementById('address').value = resumeData.address || '';
      document.getElementById('linkedin').value = resumeData.linkedin || '';
      document.getElementById('website').value = resumeData.website || '';
      document.getElementById('experience').value = resumeData.experience || '';
      document.getElementById('education').value = resumeData.education || '';
    });
  });
  