import { syncTheme } from "../../../js/syncTheme.js";
import { toggleMenuButton } from "../../../js/toggleMenuButton.js";
import { burgerMenu } from "../../../js/burgerMenu.js";
import { cards } from "./cards.js";
import { modalWindow } from "./modalWindow.js";

syncTheme();
toggleMenuButton();

burgerMenu();
cards();
modalWindow();
