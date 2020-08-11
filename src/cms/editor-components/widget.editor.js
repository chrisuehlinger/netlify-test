const widgetEditor = props =>
  `<Widget />`

export const widgetEditorConfig = {
  // Internal id of the component
  id: "widget",
  // Visible label
  label: "Widget",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Widget \/>/g,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(props) {
    return widgetEditor(props)
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(props) {
    return widgetEditor(props)
  },
}
