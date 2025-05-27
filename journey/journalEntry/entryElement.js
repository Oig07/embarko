"use strict";

// Date Formatter
import { formatDate } from "./utils/dateFormater.js"

// Create Entry Elements
export function createEntryElement(entry, entryCount) {
  const container = document.createElement("div");
  container.className = "journeyEntryContainer";
  container.id = "journeyEntryContainer";

  const entryPadding = document.createElement("div");
  entryPadding.className = "entryPadding";

  const button = document.createElement("button");
  button.className = "collapsibleEntry";
  button.textContent = `Day ${entryCount} - ${formatDate(entry.created_at)}`;
  button.style.fontSize = "24px";
  button.style.fontWeight = "400";
  button.style.color = "#333";

  const content = document.createElement("div");
  content.className = "collapsibleContent entry-content collapsed";

  const paragraph = document.createElement("p");
  paragraph.textContent = entry.content || "Nothing Added";
  content.appendChild(paragraph);

  entryPadding.appendChild(button);
  entryPadding.appendChild(content);
  container.appendChild(entryPadding);

  return container;
}
