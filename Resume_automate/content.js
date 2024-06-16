chrome.storage.sync.get(['resumeData'], (result) => {
    const resumeData = result.resumeData || {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      experience: '',
      education: ''
    };
  
    const inputMappings = {
      'name': ['name', 'full name'],
      'email': ['email'],
      'phone': ['phone', 'phone number','Mobile number'],
      'address': ['address'],
      'linkedin': ['linkedin'],
      'website': ['website', 'personal website'],
      'experience': ['experience', 'work experience', 'job experience'],
      'education': ['education', 'qualification', 'academics']
    };
  
    const fillInput = (input, value) => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    };
  
    const fillForm = () => {
      const inputs = document.querySelectorAll('input, textarea');
  
      inputs.forEach(input => {
        const name = input.getAttribute('name')?.toLowerCase();
        const id = input.getAttribute('id')?.toLowerCase();
        const placeholder = input.getAttribute('placeholder')?.toLowerCase();
  
        Object.keys(resumeData).forEach(key => {
          if (
            inputMappings[key].some(mapping =>
              name?.includes(mapping) ||
              id?.includes(mapping) ||
              placeholder?.includes(mapping)
            )
          ) {
            fillInput(input, resumeData[key]);
          }
        });
      });
  
      const selects = document.querySelectorAll('select');
      selects.forEach(select => {
        if (select.options.length > 1) {
          select.selectedIndex = 1;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    };
  
    fillForm();
  });
  