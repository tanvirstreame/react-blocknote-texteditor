import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function EmojiToolbarButton({ editor }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>😊</button>
      {showPicker && (
        <div style={{ position: "absolute", top: "40px", zIndex: 999 }}>
          <EmojiPicker
            onEmojiClick={(emojiObject) => {
              editor.insertInlineContent(emojiObject.emoji);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiToolbarButton;
