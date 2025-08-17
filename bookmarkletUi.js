Javascript:(function() {
  if (window.__bookmarkletUiInjected) return;
  window.__bookmarkletUiInjected = true;

  function getDominantColors() {
    const bodyStyle = getComputedStyle(document.body);
    const htmlStyle = getComputedStyle(document.documentElement);

    let bgColor = bodyStyle.backgroundColor || htmlStyle.backgroundColor || '#fff';
    let textColor = bodyStyle.color || htmlStyle.color || '#222';

    if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') bgColor = '#fff';

    return { bgColor, textColor };
  }

  const { bgColor, textColor } = getDominantColors();

  var style = document.createElement('style');
  style.textContent = `
    .bookmarklet-chat-btn {
      position: fixed !important;
      bottom: 32px !important;
      right: 32px !important;
      z-index: 2147483647 !important;
      background: ${bgColor} !important;
      color: ${textColor} !important;
      border: none !important;
      border-radius: 50% !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
      width: 56px !important;
      height: 56px !important;
      font-size: 32px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      cursor: pointer !important;
      transition: box-shadow 0.2s !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      outline: none !important;
      user-select: none !important;
    }
    .bookmarklet-chat-btn:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important;
      background: ${bgColor} !important;
    }
    .bookmarklet-chat-input-container {
      position: fixed !important;
      right: 100px !important;
      z-index: 2147483647 !important;
      background: ${bgColor} !important;
      border-radius: 18px !important;
      box-shadow: 0 4px 24px rgba(0,0,0,0.13) !important;
      padding: 10px 14px 10px 14px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      min-width: 280px !important;
      max-width: 380px !important;
      transition: opacity 0.25s, transform 0.25s !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transform: translateX(40px) !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      font-size: 15px !important;
      box-sizing: border-box !important;
      outline: none !important;
    }
    .bookmarklet-chat-input-container.open {
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: translateX(0) !important;
    }
    .bookmarklet-chat-input {
      flex: 1 1 0% !important;
      border: 1px solid #e0e4ea !important;
      border-radius: 12px !important;
      padding: 8px 12px !important;
      font-size: 15px !important;
      outline: none !important;
      transition: border 0.2s !important;
      background: ${(() => {
        let hex = bgColor.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
        let r = parseInt(hex.substring(0,2),16);
        let g = parseInt(hex.substring(2,4),16);
        let b = parseInt(hex.substring(4,6),16);
        r = Math.round(r + (255 - r) * 0.18);
        g = Math.round(g + (255 - g) * 0.18);
        b = Math.round(b + (255 - b) * 0.18);
        return `rgb(${r},${g},${b})`;
      })()} !important;
      color: #222 !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      box-sizing: border-box !important;
      height: 36px !important;
      line-height: 1.2 !important;
    }
    .bookmarklet-chat-input:focus {
      border: 1.5px solid #4f8cff !important;
      background: rgba(255,255,255,0.95) !important;
    }
    .bookmarklet-chat-send {
      background: linear-gradient(90deg, #4f8cff 0%, #2356c7 100%) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 10px !important;
      padding: 7px 16px !important;
      font-size: 15px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      cursor: pointer !important;
      transition: background 0.2s !important;
      box-sizing: border-box !important;
      height: 36px !important;
      outline: none !important;
    }
    .bookmarklet-chat-send:hover {
      background: linear-gradient(90deg, #2356c7 0%, #4f8cff 100%) !important;
    }
    .bookmarklet-chat-settings {
      background: linear-gradient(90deg, #6c757d 0%, #495057 100%) !important;
      color: #fff !important;
      border: none !important;
      border-radius: 10px !important;
      padding: 7px 12px !important;
      font-size: 15px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      cursor: pointer !important;
      transition: background 0.2s !important;
      box-sizing: border-box !important;
      height: 36px !important;
      outline: none !important;
      margin-left: 8px !important;
      flex-shrink: 0 !important;
    }
    .bookmarklet-chat-settings:hover {
      background: linear-gradient(90deg, #495057 0%, #6c757d 100%) !important;
    }
    .bookmarklet-chat-history-panel {
      position: absolute !important;
      background: ${bgColor} !important;
      border-radius: 18px !important;
      box-shadow: 0 4px 24px rgba(0,0,0,0.13) !important;
      padding: 16px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      font-size: 15px !important;
      z-index: 2147483648 !important;
      width: 100% !important;
      max-height: 300px !important;
      overflow-y: auto !important;
      display: none !important;
      border: 1px solid #e0e4ea !important;
      bottom: 100% !important;
      left: 0 !important;
      margin-bottom: 8px !important;
    }
    .bookmarklet-chat-history-panel.open {
      display: block !important;
    }
    .bookmarklet-chat-history-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 12px !important;
      padding-bottom: 8px !important;
      border-bottom: 1px solid #e0e4ea !important;
    }
    .bookmarklet-chat-history-title {
      font-weight: 600 !important;
      color: ${textColor} !important;
      font-size: 16px !important;
    }
    .bookmarklet-chat-history-close {
      background: none !important;
      border: none !important;
      color: #6c757d !important;
      font-size: 18px !important;
      cursor: pointer !important;
      padding: 0 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 50% !important;
      transition: background 0.2s !important;
    }
    .bookmarklet-chat-history-close:hover {
      background: rgba(0,0,0,0.1) !important;
    }
    .bookmarklet-chat-history-message {
      padding: 8px 0 !important;
      border-bottom: 1px solid rgba(0,0,0,0.1) !important;
    }
    .bookmarklet-chat-history-message:last-child {
      border-bottom: none !important;
    }
    .bookmarklet-chat-history-message.own-message {
      background: rgba(79,140,255,0.1) !important;
      margin: 4px -8px !important;
      padding: 8px !important;
      border-radius: 8px !important;
    }
    .bookmarklet-chat-history-sender {
      font-weight: 600 !important;
      color: #2356c7 !important;
      font-size: 14px !important;
      margin-bottom: 2px !important;
    }
    .bookmarklet-chat-history-sender.own-sender {
      color: #4f8cff !important;
    }
    .bookmarklet-chat-history-text {
      color: ${textColor} !important;
      font-size: 15px !important;
      line-height: 1.3 !important;
      word-break: break-word !important;
    }
    .bookmarklet-chat-history-time {
      color: #6c757d !important;
      font-size: 12px !important;
      margin-top: 4px !important;
    }
    .bookmarklet-chat-history-empty {
      text-align: center !important;
      color: #6c757d !important;
      font-style: italic !important;
      padding: 20px 0 !important;
    }
    .bookmarklet-chat-notification {
      position: fixed !important;
      right: 40px !important;
      bottom: 100px !important;
      z-index: 2147483648 !important;
      background: #fff !important;
      color: #222 !important;
      border-radius: 14px !important;
      box-shadow: 0 4px 24px rgba(0,0,0,0.13) !important;
      padding: 10px 16px !important;
      font-size: 15px !important;
      min-width: 180px !important;
      max-width: 320px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      opacity: 0.98 !important;
      animation: bookmarklet-fadein 0.3s !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      box-sizing: border-box !important;
      outline: none !important;
    }
    @keyframes bookmarklet-fadein {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 0.98; transform: translateY(0); }
    }
    .bookmarklet-chat-notification-sender {
      font-weight: 600 !important;
      color: #2356c7 !important;
      margin-bottom: 1px !important;
      font-size: 14px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      line-height: 1.1 !important;
    }
    .bookmarklet-chat-notification-message {
      word-break: break-word !important;
      font-size: 15px !important;
      font-family: 'Segoe UI', Arial, sans-serif !important;
      line-height: 1.2 !important;
    }
  `;
  document.head.appendChild(style);

  var chatBtn = document.createElement('button');
  chatBtn.className = 'bookmarklet-chat-btn';
  chatBtn.textContent = '?';
  document.body.appendChild(chatBtn);

  var inputContainer = document.createElement('div');
  inputContainer.className = 'bookmarklet-chat-input-container';
  inputContainer.style.display = 'none';
  inputContainer.innerHTML = `
    <input class="bookmarklet-chat-input" type="text" placeholder="Type your message..." maxlength="500" />
    <button class="bookmarklet-chat-send">Send</button>
  `;
  document.body.appendChild(inputContainer);

  function createSettingsButton() {
    if (settingsBtn) return;
    settingsBtn = document.createElement('button');
    settingsBtn.className = 'bookmarklet-chat-settings';
    settingsBtn.textContent = '⚙';
    settingsBtn.style.display = 'none';
    settingsBtn.addEventListener('click', function() {
      showHistoryPanel();
    });
    inputContainer.appendChild(settingsBtn);
  }

  function showSettingsButton() {
    createSettingsButton();
    settingsBtn.style.display = 'block';
  }

  function hideSettingsButton() {
    if (settingsBtn) {
      settingsBtn.style.display = 'none';
    }
  }

  function isAdminCommand(text) {
    return text === END_CMD || text === HELP_CMD || text === CLEAR_CMD || 
           text === SET_CMD || text === UNSET_CMD || text.startsWith(KICK_CMD + ':') || text.startsWith(NOTE_CMD + ':');
  }

  function alignInputWithButton() {
    var btnRect = chatBtn.getBoundingClientRect();
    var inputRect = inputContainer.getBoundingClientRect();
    var top = btnRect.top + (btnRect.height / 2) - (inputRect.height / 2) + window.scrollY;
    var right = window.innerWidth - btnRect.left + 12;
    var minTop = window.scrollY + 8;
    var maxTop = window.scrollY + window.innerHeight - inputRect.height - 8;
    if (top < minTop) top = minTop;
    if (top > maxTop) top = maxTop;
    inputContainer.style.top = top + 'px';
    inputContainer.style.right = right + 'px';
    inputContainer.style.bottom = '';
    inputContainer.style.left = '';
  }

  function deactivateBookmarklet() {
    if (chatBtn && chatBtn.parentNode) chatBtn.parentNode.removeChild(chatBtn);
    if (inputContainer && inputContainer.parentNode) inputContainer.parentNode.removeChild(inputContainer);
    var notifs = document.querySelectorAll('.bookmarklet-chat-notification');
    notifs.forEach(function(n) { n.remove(); });
    window.__bookmarkletUiInjected = false;
    if (window.__bookmarkletUiSubscribed && window.supabaseClient && window.__bookmarkletUiChannel) {
      window.supabaseClient.removeChannel(window.__bookmarkletUiChannel);
      window.__bookmarkletUiSubscribed = false;
      window.__bookmarkletUiChannel = null;
    }
  }

  function deleteAllMessages(callback) {
    if (!window.supabaseClient) return;
    window.supabaseClient
      .from('messages')
      .delete()
      .not('id', 'is', null)
      .then(function({ error }) {
        if (error) {
          showSendStatus('Error clearing messages', true);
        } else {
          showSendStatus('All messages cleared!');
          if (typeof callback === 'function') callback();
        }
      });
  }

  function checkForEndMessage(callback) {
    var SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/dist/umd/supabase.min.js";
    var SUPABASE_URL = "https://eyjjetqrnnalhxhcvfzm.supabase.co";
    var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ampldHFybm5hbGh4aGN2ZnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTc1NjEsImV4cCI6MjA2MjM5MzU2MX0.aQKxa1cLtreMc8zJoueFzA0P4ELyqsJkWMYbgXJwHGY";
    function proceed() {
      var tempClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
      if (!tempClient) {
        var script = document.createElement('script');
        script.src = SUPABASE_CDN;
        script.onload = function() { proceed(); };
        document.head.appendChild(script);
        return;
      }
      tempClient
        .from('messages')
        .select('text')
        .or('text.eq.' + END_CMD + ',text.eq.' + HELP_CMD)
        .limit(2)
        .then(function(res) {
          var hasEnd = res.data && res.data.some(function(msg) { return msg.text === END_CMD; });
          var hasHelp = res.data && res.data.some(function(msg) { return msg.text === HELP_CMD; });
          if (hasEnd || hasHelp) {
            var restrictionMsg = hasEnd && hasHelp ? 'END and HELP' : hasEnd ? 'END' : 'HELP';
            var pw = prompt('This service is currently unavailable, due to restrictions by the creator.\nEnter password to unlock:');
            if (pw === CLEAR_CMD) {
              var realClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : tempClient;
              realClient
                .from('messages')
                .delete()
                .not('id', 'is', null)
                .then(function() {
                  realClient
                    .from('messages')
                    .select('text')
                    .or('text.eq.' + END_CMD + ',text.eq.' + HELP_CMD)
                    .limit(2)
                    .then(function(res2) {
                      var stillHasEnd = res2.data && res2.data.some(function(msg) { return msg.text === END_CMD; });
                      var stillHasHelp = res2.data && res2.data.some(function(msg) { return msg.text === HELP_CMD; });
                      if (!stillHasEnd && !stillHasHelp) {
                        alert('All messages cleared and access restored.');
                        callback();
                      } else {
                        alert('Failed to clear ' + restrictionMsg + ' restriction. Try again.');
                        deactivateBookmarklet();
                      }
                    });
                });
            } else {
              alert('Access denied.');
              deactivateBookmarklet();
            }
          } else {
            callback();
          }
        });
    }
    proceed();
  }

  function decodeCmd(encoded) {
    return atob(encoded);
  }
  function encodeCmd(str) {
    return btoa(str);
  }
  var HELP_CMD = decodeCmd('SEVMUA==');
  var END_CMD = decodeCmd('RU5E');
  var CLEAR_CMD = decodeCmd('Q0xFQVI=');
  var KICK_CMD = decodeCmd('S0lDSw==');
  var NOTE_CMD = decodeCmd('Tk9URQ==');
  var SET_CMD = decodeCmd('U0VU');
  var UNSET_CMD = decodeCmd('VU5TRVQ=');
  var noteBanner = null;
  var settingsBtn = null;
  var historyPanel = null;

  function createHistoryPanel() {
    if (historyPanel) return;
    historyPanel = document.createElement('div');
    historyPanel.className = 'bookmarklet-chat-history-panel';
    historyPanel.innerHTML = `
      <div class="bookmarklet-chat-history-header">
        <div class="bookmarklet-chat-history-title">Message History</div>
        <button class="bookmarklet-chat-history-close">×</button>
      </div>
      <div class="bookmarklet-chat-history-content"></div>
    `;
    inputContainer.appendChild(historyPanel);
    
    var closeBtn = historyPanel.querySelector('.bookmarklet-chat-history-close');
    closeBtn.addEventListener('click', function() {
      historyPanel.classList.remove('open');
    });
  }

  function positionHistoryPanel() {
    if (!historyPanel) return;
    historyPanel.style.position = 'absolute';
    historyPanel.style.bottom = '100%';
    historyPanel.style.left = '0';
    historyPanel.style.right = '';
    historyPanel.style.top = '';
    historyPanel.style.marginBottom = '8px';
  }

  function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var now = new Date();
    var diff = now - date;
    
    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      var minutes = Math.floor(diff / 60000);
      return minutes + 'm ago';
    } else if (diff < 86400000) {
      var hours = Math.floor(diff / 3600000);
      return hours + 'h ago';
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
  }

  function loadMessageHistory() {
    if (!window.supabaseClient || !historyPanel) return;
    
    var content = historyPanel.querySelector('.bookmarklet-chat-history-content');
    content.innerHTML = '<div class="bookmarklet-chat-history-empty">Loading messages...</div>';
    
    window.supabaseClient
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          var messages = res.data.filter(function(msg) {
            return !isAdminCommand(msg.text);
          });
          
          if (messages.length === 0) {
            content.innerHTML = '<div class="bookmarklet-chat-history-empty">No messages found</div>';
            return;
          }
          
          content.innerHTML = '';
          messages.reverse().forEach(function(msg) {
            getUserIP(function(ip) {
              var isOwnMessage = msg.ip === ip;
              var messageDiv = document.createElement('div');
              messageDiv.className = 'bookmarklet-chat-history-message' + (isOwnMessage ? ' own-message' : '');
              messageDiv.innerHTML = `
                <div class="bookmarklet-chat-history-sender${isOwnMessage ? ' own-sender' : ''}">${msg.sender || 'Anonymous'}</div>
                <div class="bookmarklet-chat-history-text">${msg.text}</div>
                <div class="bookmarklet-chat-history-time">${formatTimestamp(msg.created_at)}</div>
              `;
              content.appendChild(messageDiv);
            });
          });
        } else {
          content.innerHTML = '<div class="bookmarklet-chat-history-empty">No messages found</div>';
        }
      })
      .catch(function(error) {
        content.innerHTML = '<div class="bookmarklet-chat-history-empty">Error loading messages</div>';
      });
  }

  function updateHistoryWithNewMessage(msg) {
    if (!historyPanel || !historyPanel.classList.contains('open')) return;
    
    if (isAdminCommand(msg.text)) return;
    
    var content = historyPanel.querySelector('.bookmarklet-chat-history-content');
    getUserIP(function(ip) {
      var isOwnMessage = msg.ip === ip;
      var messageDiv = document.createElement('div');
      messageDiv.className = 'bookmarklet-chat-history-message' + (isOwnMessage ? ' own-message' : '');
      messageDiv.innerHTML = `
        <div class="bookmarklet-chat-history-sender${isOwnMessage ? ' own-sender' : ''}">${msg.sender || 'Anonymous'}</div>
        <div class="bookmarklet-chat-history-text">${msg.text}</div>
        <div class="bookmarklet-chat-history-time">${formatTimestamp(msg.created_at)}</div>
      `;
      content.appendChild(messageDiv);
      
      var messages = content.querySelectorAll('.bookmarklet-chat-history-message');
      if (messages.length > 50) {
        messages[0].remove();
      }
      
      content.scrollTop = content.scrollHeight;
    });
  }

  function showHistoryPanel() {
    createHistoryPanel();
    positionHistoryPanel();
    loadMessageHistory();
    historyPanel.classList.add('open');
  }

  var HELP_LOCKED = false;
  var helpLockedClickCount = 0;

  function checkForHelpMessage(callback) {
    if (!window.supabaseClient) {
      setTimeout(function() { checkForHelpMessage(callback); }, 100);
      return;
    }
    window.supabaseClient
      .from('messages')
      .select('text')
      .eq('text', HELP_CMD)
      .limit(1)
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          HELP_LOCKED = true;
          callback(true);
        } else {
          HELP_LOCKED = false;
          callback(false);
        }
      });
  }

  chatBtn.addEventListener('click', function() {
    if (HELP_LOCKED) {
      inputContainer.classList.remove('open');
      inputContainer.style.display = 'none';
      helpLockedClickCount++;
      var existing = document.getElementById('bookmarklet-help-locked');
      if (!existing) {
        var lockedMsg = document.createElement('div');
        lockedMsg.id = 'bookmarklet-help-locked';
        alignInputWithButton();
        var inputRect = inputContainer.getBoundingClientRect();
        lockedMsg.style.position = 'fixed';
        lockedMsg.style.top = inputContainer.style.top;
        lockedMsg.style.right = inputContainer.style.right;
        lockedMsg.style.bottom = inputContainer.style.bottom;
        lockedMsg.style.left = inputContainer.style.left;
        lockedMsg.style.width = inputContainer.offsetWidth + 'px';
        lockedMsg.style.height = inputContainer.offsetHeight + 'px';
        lockedMsg.style.display = 'flex';
        lockedMsg.style.alignItems = 'center';
        lockedMsg.style.justifyContent = 'center';
        lockedMsg.style.background = '#fff';
        lockedMsg.style.color = '#222';
        lockedMsg.style.borderRadius = '18px';
        lockedMsg.style.boxShadow = '0 4px 24px rgba(0,0,0,0.13)';
        lockedMsg.style.padding = '18px 28px';
        lockedMsg.style.fontSize = '17px';
        lockedMsg.style.fontFamily = 'Segoe UI, Arial, sans-serif';
        lockedMsg.style.zIndex = 2147483648;
        lockedMsg.textContent = 'Sorry, connection failed.';
        document.body.appendChild(lockedMsg);
        setTimeout(function() { if (lockedMsg.parentNode) lockedMsg.parentNode.removeChild(lockedMsg); }, 3500);
      }
      if (helpLockedClickCount >= 3) {
        deactivateBookmarklet();
      }
      return;
    }
    var open = inputContainer.classList.toggle('open');
    inputContainer.style.display = open ? 'flex' : 'none';
    if (open) {
      alignInputWithButton();
      setTimeout(function() {
        inputContainer.querySelector('.bookmarklet-chat-input').focus();
      }, 200);
    }
  });
  window.addEventListener('resize', function() {
    if (inputContainer.classList.contains('open')) alignInputWithButton();
    if (historyPanel && historyPanel.classList.contains('open')) positionHistoryPanel();
  });

  // Supabase client is now expected to be initialized globally by the loader script
  function loadSupabaseClient(callback) {
    if (window.supabaseClient) {
      callback();
      return;
    }
    // Wait for global client to be available
    var checkInterval = setInterval(function() {
      if (window.supabaseClient) {
        clearInterval(checkInterval);
        callback();
      }
    }, 100);
  }

  function setNicknameForIP(ip, nickname, callback) {
    window.supabaseClient
      .from('user_names')
      .insert([{ ip: ip, nickname: nickname }])
      .then(function() {
        if (callback) callback();
      });
  }

  function getNicknameForIP(ip, callback) {
    window.supabaseClient
      .from('user_names')
      .select('nickname')
      .eq('ip', ip)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(function(res) {
        if (res.data && res.data.length > 0) {
          callback(res.data[0].nickname);
        } else {
          callback('');
        }
      });
  }

  function initSupabase() {
    if (!window.supabaseClient) {
      setTimeout(initSupabase, 100);
      return;
    }
    if (!window.__bookmarkletUiSubscribed) {
      window.__bookmarkletUiSubscribed = true;
      var channel = window.supabaseClient
        .channel('public:messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          function(payload) {
            var msg = payload.new;
            if (msg.text === END_CMD) {
              deactivateBookmarklet();
              return;
            }
            if (msg.text === HELP_CMD) {
              HELP_LOCKED = true;
              inputContainer.classList.remove('open');
              inputContainer.style.display = 'none';
              helpLockedClickCount = 0;
              var existing = document.getElementById('bookmarklet-help-locked');
              if (!existing) {
                var lockedMsg = document.createElement('div');
                lockedMsg.id = 'bookmarklet-help-locked';
                alignInputWithButton();
                lockedMsg.style.position = 'fixed';
                lockedMsg.style.top = inputContainer.style.top;
                lockedMsg.style.right = inputContainer.style.right;
                lockedMsg.style.bottom = inputContainer.style.bottom;
                lockedMsg.style.left = inputContainer.style.left;
                lockedMsg.style.width = inputContainer.offsetWidth + 'px';
                lockedMsg.style.height = inputContainer.offsetHeight + 'px';
                lockedMsg.style.display = 'flex';
                lockedMsg.style.alignItems = 'center';
                lockedMsg.style.justifyContent = 'center';
                lockedMsg.style.background = '#fff';
                lockedMsg.style.color = '#222';
                lockedMsg.style.borderRadius = '18px';
                lockedMsg.style.boxShadow = '0 4px 24px rgba(0,0,0,0.13)';
                lockedMsg.style.padding = '18px 28px';
                lockedMsg.style.fontSize = '17px';
                lockedMsg.style.fontFamily = 'Segoe UI, Arial, sans-serif';
                lockedMsg.style.zIndex = 2147483648;
                lockedMsg.textContent = 'Sorry, connection failed.';
                document.body.appendChild(lockedMsg);
                setTimeout(function() { if (lockedMsg.parentNode) lockedMsg.parentNode.removeChild(lockedMsg); }, 3500);
              }
              return;
            }
            if (msg.text === SET_CMD) {
              showSettingsButton();
              return;
            }
            if (msg.text === UNSET_CMD) {
              hideSettingsButton();
              return;
            }
            if (msg.text && msg.text.startsWith(KICK_CMD + ':')) {
              getUserIP(function(ip) {
                getNicknameForIP(ip, function(nickname) {
                  var kicked = msg.text.slice((KICK_CMD + ':').length).trim();
                  if (nickname && kicked.toLowerCase() === nickname.toLowerCase()) {
                    alert('You have been kicked from the chat.');
                    deactivateBookmarklet();
                  }
                });
              });
              return;
            }
            if (msg.text && msg.text.startsWith(NOTE_CMD + ':')) {
              var noteText = msg.text.slice((NOTE_CMD + ':').length);
              showNoteBanner(noteText);
              return;
            }
            getUserIP(function(ip) {
              getNicknameForIP(ip, function(nickname) {
                if (msg.ip === ip && msg.sender === nickname) return;
                showInPageNotification(msg.sender, msg.text);
                showBrowserNotification(msg.sender, msg.text);
                updateHistoryWithNewMessage(msg);
              });
            });
          }
        )
        .subscribe();
      window.__bookmarkletUiChannel = channel;
    }
  }

  var lastMessages = [];
  var messageTimestamps = [];

  function isSpam(msg) {
    if (lastMessages.length >= 2 && lastMessages[lastMessages.length - 1] === msg && lastMessages[lastMessages.length - 2] === msg) {
      return 'You cannot send the same message more than 3 times in a row.';
    }
    var now = Date.now();
    messageTimestamps = messageTimestamps.filter(function(ts) { return now - ts < 10000; });
    if (messageTimestamps.length >= 5) {
      return 'You cannot send more than 5 messages in 10 seconds.';
    }
    return null;
  }

  function getUserIP(callback) {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => callback(data.ip))
      .catch(() => callback('unknown'));
  }

  function sendMessage(msg) {
    if (!window.supabaseClient) return;
    if (HELP_LOCKED) return;
    var spamError = isSpam(msg);
    if (spamError) {
      showSendStatus(spamError, true);
      return;
    }
    if (msg === CLEAR_CMD) {
      deleteAllMessages();
      return;
    }
    getUserIP(function(ip) {
      getNicknameForIP(ip, function(nickname) {
        if (!nickname) {
          nickname = prompt('Enter a nickname for chat (or leave blank for anonymous):') || '';
          setNicknameForIP(ip, nickname, function() {
            window.supabaseClient
              .from('messages')
              .insert([{ text: msg, sender: nickname, ip: ip }])
              .then(function({ error }) {
                if (error) {
                  showSendStatus('Error sending message', true);
                } else {
                  showSendStatus('Message sent!');
                  lastMessages.push(msg);
                  if (lastMessages.length > 3) lastMessages.shift();
                  messageTimestamps.push(Date.now());
                }
              });
          });
        } else {
          window.supabaseClient
            .from('messages')
            .insert([{ text: msg, sender: nickname, ip: ip }])
            .then(function({ error }) {
              if (error) {
                showSendStatus('Error sending message', true);
              } else {
                showSendStatus('Message sent!');
                lastMessages.push(msg);
                if (lastMessages.length > 3) lastMessages.shift();
                messageTimestamps.push(Date.now());
              }
            });
        }
      });
    });
  }

  function showSendStatus(text, isError) {
    var status = document.createElement('div');
    status.textContent = text;
    status.style.position = 'fixed';
    status.style.bottom = '120px';
    status.style.right = '40px';
    status.style.background = isError ? '#ff4f4f' : '#4f8cff';
    status.style.color = '#fff';
    status.style.padding = '8px 18px';
    status.style.borderRadius = '10px';
    status.style.fontSize = '15px';
    status.style.boxShadow = '0 2px 8px rgba(0,0,0,0.13)';
    status.style.zIndex = 2147483647;
    status.style.opacity = '0.95';
    status.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    status.style.boxSizing = 'border-box';
    document.body.appendChild(status);
    setTimeout(function() {
      status.style.transition = 'opacity 0.4s';
      status.style.opacity = '0';
      setTimeout(function() { status.remove(); }, 400);
    }, 1200);
  }

  function showInPageNotification(sender, message) {
    if (HELP_LOCKED) return;
    if (isAdminCommand(message)) return;
    var notif = document.createElement('div');
    notif.className = 'bookmarklet-chat-notification';
    var senderDiv = document.createElement('div');
    senderDiv.className = 'bookmarklet-chat-notification-sender';
    senderDiv.textContent = sender ? sender : 'Anonymous';
    var msgDiv = document.createElement('div');
    msgDiv.className = 'bookmarklet-chat-notification-message';
    msgDiv.textContent = message;
    notif.appendChild(senderDiv);
    notif.appendChild(msgDiv);
    document.body.appendChild(notif);
    setTimeout(function() {
      notif.style.transition = 'opacity 0.4s';
      notif.style.opacity = '0';
      setTimeout(function() { notif.remove(); }, 400);
    }, 3500);
  }

  function showBrowserNotification(sender, message) {
    if (HELP_LOCKED) return;
    if (isAdminCommand(message)) return;
    if (window.location.protocol !== 'https:') return;
    if (!window.Notification) return;
    if (Notification.permission === 'granted') {
      new Notification(sender ? sender : 'New message', { body: message });
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification(sender ? sender : 'New message', { body: message });
        }
      });
    }
  }

  function processInputCommand(msg) {
    if (!msg.startsWith('/')) return false;
    var parts = msg.slice(1).split(' ');
    var cmd = parts[0].toLowerCase();
    if (cmd === 'kick' && parts[1]) {
      var target = parts.slice(1).join(' ');
      window.supabaseClient
        .from('messages')
        .insert([{ text: KICK_CMD + ':' + target }]);
      showSendStatus('Kick command sent');
      return true;
    }
    if (cmd === 'note' && parts[1]) {
      var noteMsg = parts.slice(1).join(' ');
      window.supabaseClient
        .from('messages')
        .insert([{ text: NOTE_CMD + ':' + noteMsg }]);
      showSendStatus('Note set');
      return true;
    }
    if (cmd === 'clear') {
      window.supabaseClient
        .from('messages')
        .insert([{ text: CLEAR_CMD }]);
      showSendStatus('Clear command sent');
      return true;
    }
    if (cmd === 'end') {
      window.supabaseClient
        .from('messages')
        .insert([{ text: END_CMD }]);
      showSendStatus('End command sent');
      return true;
    }
    if (cmd === 'set') {
      window.supabaseClient
        .from('messages')
        .insert([{ text: SET_CMD }]);
      showSendStatus('Settings button enabled');
      return true;
    }
    if (cmd === 'unset') {
      window.supabaseClient
        .from('messages')
        .insert([{ text: UNSET_CMD }]);
      showSendStatus('Settings button disabled');
      return true;
    }
    return false;
  }

  function showNoteBanner(noteText) {
    if (noteBanner) noteBanner.remove();
    noteText = noteText.replace(/^\s*note\s*:/i, '').trim();
    noteBanner = document.createElement('div');
    noteBanner.style.position = 'fixed';
    noteBanner.style.top = '0';
    noteBanner.style.left = '0';
    noteBanner.style.width = '100vw';
    noteBanner.style.background = '#e3f0ff';
    noteBanner.style.color = '#2356c7';
    noteBanner.style.fontSize = '22px';
    noteBanner.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    noteBanner.style.padding = '22px 0 22px 0';
    noteBanner.style.textAlign = 'center';
    noteBanner.style.zIndex = 2147483649;
    noteBanner.style.fontWeight = 'bold';
    noteBanner.style.boxShadow = '0 4px 24px rgba(79,140,255,0.13)';
    noteBanner.style.display = 'flex';
    noteBanner.style.justifyContent = 'center';
    noteBanner.style.alignItems = 'center';

    var textDiv = document.createElement('span');
    textDiv.textContent = noteText;
    noteBanner.appendChild(textDiv);

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#2356c7';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.marginLeft = '18px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.lineHeight = '1';
    closeBtn.style.padding = '0 10px';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.transition = 'background 0.2s';
    closeBtn.addEventListener('mouseenter', function() {
      closeBtn.style.background = '#d0e6ff';
    });
    closeBtn.addEventListener('mouseleave', function() {
      closeBtn.style.background = 'none';
    });
    closeBtn.onclick = function() {
      if (noteBanner) noteBanner.remove();
    };
    noteBanner.appendChild(closeBtn);

    document.body.appendChild(noteBanner);
    setTimeout(function() {
      if (noteBanner && noteBanner.parentNode) noteBanner.remove();
    }, 10000);
  }

  var input = inputContainer.querySelector('.bookmarklet-chat-input');
  var sendBtn = inputContainer.querySelector('.bookmarklet-chat-send');
  function trySend() {
    if (HELP_LOCKED) {
      inputContainer.classList.remove('open');
      inputContainer.style.display = 'none';
      showSendStatus('Chat is currently locked.', true);
      return;
    }
    var msg = input.value.trim();
    if (msg.length < 3) {
      showSendStatus('Message too short', true);
      return;
    }
    if (processInputCommand(msg)) {
      input.value = '';
      input.focus();
      return;
    }
    sendMessage(msg);
    input.value = '';
    input.focus();
  }
  sendBtn.addEventListener('click', trySend);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      trySend();
    }
  });

  function initializeWithHelpCheck() {
    loadSupabaseClient(function() {
      initSupabase();
      checkForHelpMessage(function(isHelp) {
        if (isHelp) {
          HELP_LOCKED = true;
          inputContainer.classList.remove('open');
          inputContainer.style.display = 'none';
        } else {
          HELP_LOCKED = false;
          inputContainer.style.display = '';
        }
      });
    });
  }

  checkForEndMessage(function() {
    initializeWithHelpCheck();
  });
})();
