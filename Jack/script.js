// ==========================================
//QUEEN TECH SULITIONS LIMITED - MAIN JAVASCRIPT
// ==========================================

// Your Business Contact Details (Change as needed)
const BUSINESS_WHATSAPP = '254790033113'; // Format without the '+' sign for wa.me links

// 1. Toggle Live Chat Window Visibility
function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  const badge = document.querySelector('#chat-toggle span');

  chatWindow.classList.toggle('hidden');

  // Hide notification badge once opened
  if (!chatWindow.classList.contains('hidden') && badge) {
    badge.style.display = 'none';
  }
}

// 2. Append Chat Messages to UI History
function appendMessage(sender, text, showWhatsAppButton = false) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');

  if (sender === 'user') {
    messageDiv.className = 'flex justify-end';
    messageDiv.innerHTML = `<div class="bg-blue-600 text-white p-3 rounded-2xl max-w-[85%] shadow-sm text-sm">${escapeHTML(text)}</div>`;
  } else {
    let extraButtonHTML = '';
    if (showWhatsAppButton) {
      extraButtonHTML = `
                    <div class="mt-3">
                        <a href="https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent('Hello PrimeBiz, I would like to proceed with: ' + text)}" 
                           target="_blank" 
                           class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition shadow">
                            <i class="fa-brands fa-whatsapp text-sm"></i> Continue on WhatsApp
                        </a>
                    </div>
                `;
    }

    messageDiv.className = 'flex items-start gap-2';
    messageDiv.innerHTML = `
                <div class="bg-blue-900 text-white p-2 rounded-full text-xs flex-shrink-0"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 max-w-[85%] text-gray-700 text-sm">
                    ${text}
                    ${extraButtonHTML}
                </div>
            `;
  }

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 3. Automated Intelligent Bot Response Logic
function automatedBotResponse(userMsg) {
  const msgLower = userMsg.toLowerCase();

  // Simulate a natural typing/thinking delay
  setTimeout(() => {
    let reply =
      'Thanks for reaching out! For instant processing, you can talk to our support desk directly on WhatsApp or call us at +254 790 033 113.';
    let includeWhatsAppButton = true;

    if (
      msgLower.includes('company') ||
      msgLower.includes('register') ||
      msgLower.includes('business name')
    ) {
      reply =
        'Private Limited Company registration is *KES 12,650* total (KES 10,650 official BRS fee + KES 2,000 service fee). Business Names cost *KES 1,500* total. Click below to complete your registration on WhatsApp!';
    } else if (
      msgLower.includes('web') ||
      msgLower.includes('website') ||
      msgLower.includes('development')
    ) {
      reply =
        'We build professional business websites starting from *KES 15,000* for landing pages and *KES 35,000* for corporate multi-page websites. Would you like a custom quote?';
    } else if (
      msgLower.includes('kra') ||
      msgLower.includes('ecitizen') ||
      msgLower.includes('search') ||
      msgLower.includes('cr12')
    ) {
      reply =
        'We process official CR12 searches (KES 1,000), Tax Compliance Certificates (KES 400), and KRA Nil Returns (KES 150) instantly. Send your details via WhatsApp to get started!';
    } else if (msgLower.includes('passport') || msgLower.includes('visa')) {
      reply =
        'We handle passport applications (Series A is KES 8,050 total) and foreign visitor visa/visitor pass extensions via eCitizen. Click below to chat with an agent.';
    }

    appendMessage('bot', reply, includeWhatsAppButton);
  }, 800);
}

// 4. Handle Quick Reply Chip Clicks
function sendUserChoice(choiceText) {
  appendMessage('user', choiceText);
  automatedBotResponse(choiceText);
}

// 5. Handle Text Input Submission in Chat
function sendTextMessage() {
  const inputField = document.getElementById('chat-input');
  const text = inputField.value.trim();
  if (text === '') return;

  appendMessage('user', text);
  inputField.value = '';
  automatedBotResponse(text);
}

// 6. Bind Enter Key to Input Field
function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendTextMessage();
  }
}

// 7. Security Helper to Prevent HTML Injection in Chat
function escapeHTML(str) {
  if (!str) return '';
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  };
  return str.replace(/[&<>'"]/g, function (tag) {
    return map[tag] || tag;
  });
}

// 8. On Window Load: Optional trigger to pop open chat after a few seconds
window.addEventListener('DOMContentLoaded', () => {
  // Automatically prompt chat bubble after 6 seconds to capture user attention
  setTimeout(() => {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow && chatWindow.classList.contains('hidden')) {
      // You can uncomment the line below if you want the chat to open automatically
      // toggleChat();
    }
  }, 6000);
});
