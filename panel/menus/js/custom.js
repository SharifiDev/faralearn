import {renderMenuItemsInPanel, loadMenuParentItems, uploadNewMenuItem} from '../../../js/panel/funcs/shared.js'
import {readyMenuParentItem } from '../../../js/panel/funcs/utils.js'
renderMenuItemsInPanel();
await loadMenuParentItems();
readyMenuParentItem();

window.uploadNewMenuItem = uploadNewMenuItem