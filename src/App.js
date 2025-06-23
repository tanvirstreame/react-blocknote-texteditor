import {
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  FormattingToolbar,
  SuggestionMenuController,
  useCreateBlockNote,
  FormattingToolbarController,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  BasicTextStyleButton,
} from "@blocknote/react";

import "./App.css";
import { Mention } from "./Mention.jsx";

// Our schema with inline content specs, which contain the configs and
// implementations for inline content  that we want our editor to use.
const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

// Function which gets all users for the mentions menu.
const getMentionMenuItems = (editor) => {
  const users = ["Steve", "Bob", "Joe", "Mike"];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
  }));
};

export function App() {
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "mention",
            props: {
              user: "Steve",
            },
          },
          {
            type: "text",
            text: " <- This is an example mention",
            styles: {},
          },
        ],
      },
      {
        type: "paragraph",
        content: "Press the '@' key to open the mentions menu and add another",
      },
      {
        type: "paragraph",
      },
    ],
  });

  return (
    <BlockNoteView editor={editor} sideMenu={false} formattingToolbar={false}>
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BlockTypeSelect key={'blockTypeSelect'} />
            <button onClick={() => editor.insertInlineContent("sf")}>sf</button>
            <FileCaptionButton key={'fileCaptionButton'} />
            <FileReplaceButton key={'replaceFileButton'} />

            <BasicTextStyleButton
              basicTextStyle={'bold'}
              key={'boldStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'italic'}
              key={'italicStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'underline'}
              key={'underlineStyleButton'}
            />
            <BasicTextStyleButton
              basicTextStyle={'strike'}
              key={'strikeStyleButton'}
            />
            {/* Extra button to toggle code styles */}
            <BasicTextStyleButton
              key={'codeStyleButton'}
              basicTextStyle={'code'}
            />

            <TextAlignButton
              textAlignment={'left'}
              key={'textAlignLeftButton'}
            />
            <TextAlignButton
              textAlignment={'center'}
              key={'textAlignCenterButton'}
            />
            <TextAlignButton
              textAlignment={'right'}
              key={'textAlignRightButton'}
            />

            <ColorStyleButton key={'colorStyleButton'} />

            <NestBlockButton key={'nestBlockButton'} />
            <UnnestBlockButton key={'unnestBlockButton'} />

            <CreateLinkButton key={'createLinkButton'} />
          </FormattingToolbar>
        )}
      ></FormattingToolbarController>
      <SuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) =>
          filterSuggestionItems(getMentionMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}

export default App;
