import { openColorPalateElementbgOpac, openColorEditorbgOpac, 
    openColorPalateElementbg, openColorEditorbg, fontOptions } from'./main.js';
import {changeviewport2} from './Animation.js'
import { tabletResponsiveBreakPoint,mobileResponsiveBreakPoint } from './EditBody.js';
let numberPalatte = 1;

export let fieldIDArray = [];

export const clearFieldIDArray = () => {
  fieldIDArray.splice(0, fieldIDArray.length);
}

export const bootstrapclasses = [
{value: 'bg-primary', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-secondary', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-success', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-danger', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-warning', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-info', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-light', category: ['container', 'background', 'div', 'wrapper']},
{value: 'bg-dark', category: ['container', 'background', 'div', 'wrapper']},
{value: 'h1', category: ['header', 'text', 'header text']},
{value: 'h2', category: ['header', 'text', 'header text']},
{value: 'h3', category: ['header', 'text', 'header text']},
{value: 'h4', category: ['header', 'text', 'header text']},
{value: 'h5', category: ['header', 'text', 'header text']},
{value: 'h6', category: ['header', 'text', 'header text']},
{value: 'lead', category: ['paragraph', 'text', 'span', 'font']},
{value: 'text-muted', category: ['text', 'font']},
{value: 'text-primary', category: ['text', 'font']},
{value: 'text-secondary', category: ['text', 'font']},
{value: 'text-success', category: ['text', 'font']},
{value: 'text-danger', category: ['text', 'font']},
{value: 'text-warning', category: ['text', 'font']},
{value: 'text-info', category: ['text', 'font']},
{value: 'font-weight-bold', category: ['font']},
{value: 'font-weight-normal', category: ['font']},
{value: 'font-italic', category: ['font']},
{value: 'display-1', category: ['text', 'font']},
{value: 'display-2', category: ['text', 'font']},
{value: 'display-3', category: ['text', 'font']},
{value: 'display-4', category: ['text', 'font']},
{value: 'btn-default', category: ['button', 'submit']},
{value: 'btn-primary', category: ['button', 'submit']},
{value: 'btn-success', category: ['button', 'submit']},
];

export const iconFontawesome = [
  {value: '', category: ['',]},
  {value: 'fa-solid fa-magnifying-glass', category: ['saerch']},
  {value: 'fas fa-arrow-right', category: ['arrow', 'right','direction']},
  {value: 'fas fa-chevron-right', category: ['chevron','arrow', 'right','direction']},
  {value: 'fas fa-long-arrow-alt-right', category: ['long','arrow', 'right','direction']},
  {value: 'fa-solid fa-heart', category: ['heart', 'love', 'thank', 'thanks']},
  {value: 'fa-solid fa-map-location-dot', category: ['map', 'location', 'dot', 'coordinate']},
  {value: 'fa-solid fa-map-location', category: ['map', 'location', 'dot', 'coordinate']},
  {value: 'fa-solid fa-location-pin', category: ['map', 'location', 'pin', 'coordinate']},
  {value: 'fa-solid fa-location-dot', category: ['map', 'location', 'point', 'coordinate']},
  {value: 'fa-solid fa-map-pin', category: ['map', 'location', 'pin', 'coordinate']},
  {value: 'fa-solid fa-globe', category: ['map', 'location', 'earth', 'globe']},
  {value: 'fa-solid fa-earth-americas', category: ['map', 'location', 'earth', 'globe']},
  {value: 'fa-solid fa-users-viewfinder', category: ['community', 'users', 'avatar', 'people']},
  {value: 'fa-regular fa-eye', category: ['view', 'views', 'eye', 'regular eye']},
  {value: 'fa-solid fa-eye', category: ['view', 'views', 'eye', 'solid eye']},
  {value: 'fa-solid fa-download', category: ['download', 'save', 'bookmarked', 'share']},
  {value: 'fa-solid fa-bookmark', category: ['download', 'save', 'bookmarked', 'share']},
  {value: 'fa-solid fa-share', category: ['download', 'save', 'bookmarked', 'share']},
  {value: 'fa-solid fa-at', category: ['email', 'mail', 'message', 'pm']},
   
  {value: 'fa fa-address-book', category: ['address', 'book', ]}, 
  {value: 'fa fa-address-card', category: ['address', 'card', ]}, 
  {value: 'fa fa-bandcamp', category: ['bandcamp', ]}, 
  {value: 'fa fa-bath', category: ['bath', ]}, 
  {value: 'fa fa-bathtub', category: ['bathtub', ]}, 
  {value: 'fa fa-drivers-license', category: ['drivers', 'license', ]}, 
  {value: 'fa fa-eercast', category: ['eercast', ]}, 
  {value: 'fa fa-etsy', category: ['etsy', ]}, 
  {value: 'fa fa-free-code-camp', category: ['free', 'code', 'camp', ]}, 
  {value: 'fa fa-grav', category: ['grav', ]}, 
  {value: 'fa fa-id-badge', category: ['id', 'badge', ]}, 
  {value: 'fa fa-id-card', category: ['id', 'card', ]}, 
  {value: 'fa fa-imdb', category: ['imdb', ]}, 
  {value: 'fa fa-linode', category: ['linode', ]}, 
  {value: 'fa fa-meetup', category: ['meetup', ]}, 
  {value: 'fa fa-microchip', category: ['microchip', ]}, 
  {value: 'fa fa-podcast', category: ['podcast', ]}, 
  {value: 'fa fa-quora', category: ['quora', ]}, 
  {value: 'fa fa-ravelry', category: ['ravelry', ]}, 
  {value: 'fa fa-s15', category: ['s15', ]}, 
  {value: 'fa fa-shower', category: ['shower', ]}, 
  {value: 'fa fa-superpowers', category: ['superpowers', ]}, 
  {value: 'fa fa-telegram', category: ['telegram', ]}, 
  {value: 'fa fa-thermometer', category: ['thermometer', ]}, 
  {value: 'fa fa-thermometer-0', category: ['thermometer', '0', ]}, 
  {value: 'fa fa-thermometer-1', category: ['thermometer', '1', ]}, 
  {value: 'fa fa-thermometer-2', category: ['thermometer', '2', ]}, 
  {value: 'fa fa-thermometer-3', category: ['thermometer', '3', ]}, 
  {value: 'fa fa-thermometer-4', category: ['thermometer', '4', ]}, 
  {value: 'fa fa-thermometer-empty', category: ['thermometer', 'empty', ]}, 
  {value: 'fa fa-thermometer-full', category: ['thermometer', 'full', ]}, 
  {value: 'fa fa-thermometer-half', category: ['thermometer', 'half', ]}, 
  {value: 'fa fa-thermometer-quarter', category: ['thermometer', 'quarter', ]}, 
  {value: 'fa fa-thermometer-three-quarters', category: ['thermometer', 'three', 'quarters', ]}, 
  {value: 'fa fa-times-rectangle', category: ['times', 'rectangle', ]}, 
  {value: 'fa fa-user-circle', category: ['user', 'circle', ]}, 
  {value: 'fa fa-vcard', category: ['vcard', ]}, 
  {value: 'fa fa-window-close', category: ['window', 'close', ]}, 
  {value: 'fa fa-window-maximize', category: ['window', 'maximize', ]}, 
  {value: 'fa fa-window-minimize', category: ['window', 'minimize', ]}, 
  {value: 'fa fa-window-restore', category: ['window', 'restore', ]}, 
  {value: 'fa fa-wpexplorer', category: ['wpexplorer', ]}, 
  {value: 'fa fa-address-book', category: ['address', 'book', ]}, 
  {value: 'fa fa-address-card', category: ['address', 'card', ]}, 
  {value: 'fa fa-adjust', category: ['adjust', ]}, 
  {value: 'fa fa-american-sign-language-interpreting', category: ['american', 'sign', 'language', 'interpreting', ]}, 
  {value: 'fa fa-anchor', category: ['anchor', ]}, 
  {value: 'fa fa-archive', category: ['archive', ]}, 
  {value: 'fa fa-area-chart', category: ['area', 'chart', ]}, 
  {value: 'fa fa-arrows', category: ['arrows', ]}, 
  {value: 'fa fa-arrows-h', category: ['arrows', 'h', ]}, 
  {value: 'fa fa-arrows-v', category: ['arrows', 'v', ]}, 
  {value: 'fa fa-asl-interpreting', category: ['asl', 'interpreting', ]}, 
  {value: 'fa fa-assistive-listening-systems', category: ['assistive', 'listening', 'systems', ]}, 
  {value: 'fa fa-asterisk', category: ['asterisk', ]}, 
  {value: 'fa fa-at', category: ['at', ]}, 
  {value: 'fa fa-audio-description', category: ['audio', 'description', ]}, 
  {value: 'fa fa-automobile', category: ['automobile', ]}, 
  {value: 'fa fa-balance-scale', category: ['balance', 'scale', ]}, 
  {value: 'fa fa-ban', category: ['ban', ]}, 
  {value: 'fa fa-bank', category: ['bank', ]}, 
  {value: 'fa fa-bar-chart', category: ['bar', 'chart', ]}, 
  {value: 'fa fa-barcode', category: ['barcode', ]}, 
  {value: 'fa fa-bars', category: ['bars', ]}, 
  {value: 'fa fa-battery', category: ['battery', ]}, 
  {value: 'fa fa-battery-0', category: ['battery', '0', ]}, 
  {value: 'fa fa-battery-1', category: ['battery', '1', ]}, 
  {value: 'fa fa-battery-2', category: ['battery', '2', ]}, 
  {value: 'fa fa-battery-3', category: ['battery', '3', ]}, 
  {value: 'fa fa-battery-4', category: ['battery', '4', ]}, 
  {value: 'fa fa-battery-empty', category: ['battery', 'empty', ]}, 
  {value: 'fa fa-battery-full', category: ['battery', 'full', ]}, 
  {value: 'fa fa-battery-half', category: ['battery', 'half', ]}, 
  {value: 'fa fa-battery-quarter', category: ['battery', 'quarter', ]}, 
  {value: 'fa fa-battery-three-quarters', category: ['battery', 'three', 'quarters', ]}, 
  {value: 'fa fa-bed', category: ['bed', ]}, 
  {value: 'fa fa-beer', category: ['beer', ]}, 
  {value: 'fa fa-bell', category: ['bell', ]}, 
  {value: 'fa fa-bell-slash', category: ['bell', 'slash', ]}, 
  {value: 'fa fa-bicycle', category: ['bicycle', ]}, 
  {value: 'fa fa-binoculars', category: ['binoculars', ]}, 
  {value: 'fa fa-birthday-cake', category: ['birthday', 'cake', ]}, 
  {value: 'fa fa-blind', category: ['blind', ]}, 
  {value: 'fa fa-bluetooth', category: ['bluetooth', ]}, 
  {value: 'fa fa-bluetooth-b', category: ['bluetooth', 'b', ]}, 
  {value: 'fa fa-bolt', category: ['bolt', ]}, 
  {value: 'fa fa-bomb', category: ['bomb', ]}, 
  {value: 'fa fa-book', category: ['book', ]}, 
  {value: 'fa fa-bookmark', category: ['bookmark', ]}, 
  {value: 'fa fa-briefcase', category: ['briefcase', ]}, 
  {value: 'fa fa-bug', category: ['bug', ]}, 
  {value: 'fa fa-building', category: ['building', ]}, 
  {value: 'fa fa-bullhorn', category: ['bullhorn', ]}, 
  {value: 'fa fa-bullseye', category: ['bullseye', ]}, 
  {value: 'fa fa-bus', category: ['bus', ]}, 
  {value: 'fa fa-cab', category: ['cab', ]}, 
  {value: 'fa fa-calculator', category: ['calculator', ]}, 
  {value: 'fa fa-calendar', category: ['calendar', ]}, 
  {value: 'fa fa-camera', category: ['camera', ]}, 
  {value: 'fa fa-camera-retro', category: ['camera', 'retro', ]}, 
  {value: 'fa fa-car', category: ['car', ]}, 
  {value: 'fa fa-cart-arrow-down', category: ['cart', 'arrow', 'down', ]}, 
  {value: 'fa fa-cart-plus', category: ['cart', 'plus', ]}, 
  {value: 'fa fa-cc', category: ['cc', ]}, 
  {value: 'fa fa-certificate', category: ['certificate', ]}, 
  {value: 'fa fa-check', category: ['check', ]}, 
  {value: 'fa fa-check-circle', category: ['check', 'circle', ]}, 
  {value: 'fa fa-check-square', category: ['check', 'square', ]}, 
  {value: 'fa fa-child', category: ['child', ]}, 
  {value: 'fa fa-circle', category: ['circle', ]}, 
  {value: 'fa fa-circle-thin', category: ['circle', 'thin', ]}, 
  {value: 'fa fa-clone', category: ['clone', ]}, 
  {value: 'fa fa-close', category: ['close', ]}, 
  {value: 'fa fa-cloud', category: ['cloud', ]}, 
  {value: 'fa fa-cloud-download', category: ['cloud', 'download', ]}, 
  {value: 'fa fa-cloud-upload', category: ['cloud', 'upload', ]}, 
  {value: 'fa fa-code', category: ['code', ]}, 
  {value: 'fa fa-code-fork', category: ['code', 'fork', ]}, 
  {value: 'fa fa-coffee', category: ['coffee', ]}, 
  {value: 'fa fa-cog', category: ['cog', ]}, 
  {value: 'fa fa-cogs', category: ['cogs', ]}, 
  {value: 'fa fa-comment', category: ['comment', ]}, 
  {value: 'fa fa-commenting', category: ['commenting', ]}, 
  {value: 'fa fa-comments', category: ['comments', ]}, 
  {value: 'fa fa-compass', category: ['compass', ]}, 
  {value: 'fa fa-copyright', category: ['copyright', ]}, 
  {value: 'fa fa-creative-commons', category: ['creative', 'commons', ]}, 
  {value: 'fa fa-credit-card', category: ['credit', 'card', ]}, 
  {value: 'fa fa-credit-card-alt', category: ['credit', 'card', 'alt', ]}, 
  {value: 'fa fa-crop', category: ['crop', ]}, 
  {value: 'fa fa-crosshairs', category: ['crosshairs', ]}, 
  {value: 'fa fa-cube', category: ['cube', ]}, 
  {value: 'fa fa-cubes', category: ['cubes', ]}, 
  {value: 'fa fa-cutlery', category: ['cutlery', ]}, 
  {value: 'fa fa-dashboard', category: ['dashboard', ]}, 
  {value: 'fa fa-database', category: ['database', ]}, 
  {value: 'fa fa-deaf', category: ['deaf', ]}, 
  {value: 'fa fa-deafness', category: ['deafness', ]}, 
  {value: 'fa fa-desktop', category: ['desktop', ]}, 
  {value: 'fa fa-diamond', category: ['diamond', ]}, 
  {value: 'fa fa-download', category: ['download', ]}, 
  {value: 'fa fa-drivers-license', category: ['drivers', 'license', ]}, 
  {value: 'fa fa-edit', category: ['edit', ]}, 
  {value: 'fa fa-ellipsis-h', category: ['ellipsis', 'h', ]}, 
  {value: 'fa fa-ellipsis-v', category: ['ellipsis', 'v', ]}, 
  {value: 'fa fa-envelope', category: ['envelope', ]}, 
  {value: 'fa fa-envelope-square', category: ['envelope', 'square', ]}, 
  {value: 'fa fa-eraser', category: ['eraser', ]}, 
  {value: 'fa fa-exchange', category: ['exchange', ]}, 
  {value: 'fa fa-exclamation', category: ['exclamation', ]}, 
  {value: 'fa fa-exclamation-circle', category: ['exclamation', 'circle', ]}, 
  {value: 'fa fa-exclamation-triangle', category: ['exclamation', 'triangle', ]}, 
  {value: 'fa fa-external-link', category: ['external', 'link', ]}, 
  {value: 'fa fa-external-link-square', category: ['external', 'link', 'square', ]}, 
  {value: 'fa fa-eye', category: ['eye', ]}, 
  {value: 'fa fa-eye-slash', category: ['eye', 'slash', ]}, 
  {value: 'fa fa-eyedropper', category: ['eyedropper', ]}, 
  {value: 'fa fa-fax', category: ['fax', ]}, 
  {value: 'fa fa-feed', category: ['feed', ]}, 
  {value: 'fa fa-female', category: ['female', ]}, 
  {value: 'fa fa-fighter-jet', category: ['fighter', 'jet', ]}, 
  {value: 'fa fa-film', category: ['film', ]}, 
  {value: 'fa fa-filter', category: ['filter', ]}, 
  {value: 'fa fa-fire', category: ['fire', ]}, 
  {value: 'fa fa-fire-extinguisher', category: ['fire', 'extinguisher', ]}, 
  {value: 'fa fa-flag', category: ['flag', ]}, 
  {value: 'fa fa-flag-checkered', category: ['flag', 'checkered', ]}, 
  {value: 'fa fa-flash', category: ['flash', ]}, 
  {value: 'fa fa-flask', category: ['flask', ]}, 
  {value: 'fa fa-folder', category: ['folder', ]}, 
  {value: 'fa fa-gamepad', category: ['gamepad', ]}, 
  {value: 'fa fa-gavel', category: ['gavel', ]}, 
  {value: 'fa fa-gear', category: ['gear', ]}, 
  {value: 'fa fa-gears', category: ['gears', ]}, 
  {value: 'fa fa-gift', category: ['gift', ]}, 
  {value: 'fa fa-glass', category: ['glass', ]}, 
  {value: 'fa fa-globe', category: ['globe', ]}, 
  {value: 'fa fa-graduation-cap', category: ['graduation', 'cap', ]}, 
  {value: 'fa fa-group', category: ['group', ]}, 
  {value: 'fa fa-hashtag', category: ['hashtag', ]}, 
  {value: 'fa fa-headphones', category: ['headphones', ]}, 
  {value: 'fa fa-heart', category: ['heart', ]}, 
  {value: 'fa fa-heartbeat', category: ['heartbeat', ]}, 
  {value: 'fa fa-history', category: ['history', ]}, 
  {value: 'fa fa-home', category: ['home', ]}, 
  {value: 'fa fa-hotel', category: ['hotel', ]}, 
  {value: 'fa fa-hourglass', category: ['hourglass', ]}, 
  {value: 'fa fa-hourglass-1', category: ['hourglass', '1', ]}, 
  {value: 'fa fa-hourglass-2', category: ['hourglass', '2', ]}, 
  {value: 'fa fa-hourglass-3', category: ['hourglass', '3', ]}, 
  {value: 'fa fa-hourglass-end', category: ['hourglass', 'end', ]}, 
  {value: 'fa fa-hourglass-half', category: ['hourglass', 'half', ]}, 
  {value: 'fa fa-hourglass-start', category: ['hourglass', 'start', ]}, 
  {value: 'fa fa-i-cursor', category: ['i', 'cursor', ]}, 
  {value: 'fa fa-id-badge', category: ['id', 'badge', ]}, 
  {value: 'fa fa-id-card', category: ['id', 'card', ]}, 
  {value: 'fa fa-image', category: ['image', ]}, 
  {value: 'fa fa-inbox', category: ['inbox', ]}, 
  {value: 'fa fa-industry', category: ['industry', ]}, 
  {value: 'fa fa-info', category: ['info', ]}, 
  {value: 'fa fa-info-circle', category: ['info', 'circle', ]}, 
  {value: 'fa fa-institution', category: ['institution', ]}, 
  {value: 'fa fa-key', category: ['key', ]}, 
  {value: 'fa fa-language', category: ['language', ]}, 
  {value: 'fa fa-laptop', category: ['laptop', ]}, 
  {value: 'fa fa-leaf', category: ['leaf', ]}, 
  {value: 'fa fa-legal', category: ['legal', ]}, 
  {value: 'fa fa-level-down', category: ['level', 'down', ]}, 
  {value: 'fa fa-level-up', category: ['level', 'up', ]}, 
  {value: 'fa fa-life-bouy', category: ['life', 'bouy', ]}, 
  {value: 'fa fa-life-buoy', category: ['life', 'buoy', ]}, 
  {value: 'fa fa-life-ring', category: ['life', 'ring', ]}, 
  {value: 'fa fa-life-saver', category: ['life', 'saver', ]}, 
  {value: 'fa fa-line-chart', category: ['line', 'chart', ]}, 
  {value: 'fa fa-location-arrow', category: ['location', 'arrow', ]}, 
  {value: 'fa fa-lock', category: ['lock', ]}, 
  {value: 'fa fa-low-vision', category: ['low', 'vision', ]}, 
  {value: 'fa fa-magic', category: ['magic', ]}, 
  {value: 'fa fa-magnet', category: ['magnet', ]}, 
  {value: 'fa fa-mail-forward', category: ['mail', 'forward', ]}, 
  {value: 'fa fa-mail-reply', category: ['mail', 'reply', ]}, 
  {value: 'fa fa-mail-reply-all', category: ['mail', 'reply', 'all', ]}, 
  {value: 'fa fa-male', category: ['male', ]}, 
  {value: 'fa fa-map', category: ['map', ]}, 
  {value: 'fa fa-map-marker', category: ['map', 'marker', ]}, 
  {value: 'fa fa-map-pin', category: ['map', 'pin', ]}, 
  {value: 'fa fa-map-signs', category: ['map', 'signs', ]}, 
  {value: 'fa fa-microphone', category: ['microphone', ]}, 
  {value: 'fa fa-microphone-slash', category: ['microphone', 'slash', ]}, 
  {value: 'fa fa-minus', category: ['minus', ]}, 
  {value: 'fa fa-minus-circle', category: ['minus', 'circle', ]}, 
  {value: 'fa fa-minus-square', category: ['minus', 'square', ]}, 
  {value: 'fa fa-mobile', category: ['mobile', ]}, 
  {value: 'fa fa-mobile-phone', category: ['mobile', 'phone', ]}, 
  {value: 'fa fa-mortar-board', category: ['mortar', 'board', ]}, 
  {value: 'fa fa-motorcycle', category: ['motorcycle', ]}, 
  {value: 'fa fa-mouse-pointer', category: ['mouse', 'pointer', ]}, 
  {value: 'fa fa-music', category: ['music', ]}, 
  {value: 'fa fa-navicon', category: ['navicon', ]}, 
  {value: 'fa fa-paint-brush', category: ['paint', 'brush', ]}, 
  {value: 'fa fa-paper-plane', category: ['paper', 'plane', ]}, 
  {value: 'fa fa-paw', category: ['paw', ]}, 
  {value: 'fa fa-pencil', category: ['pencil', ]}, 
  {value: 'fa fa-pencil-square', category: ['pencil', 'square', ]}, 
  {value: 'fa fa-percent', category: ['percent', ]}, 
  {value: 'fa fa-phone', category: ['phone', ]}, 
  {value: 'fa fa-phone-square', category: ['phone', 'square', ]}, 
  {value: 'fa fa-photo', category: ['photo', ]}, 
  {value: 'fa fa-pie-chart', category: ['pie', 'chart', ]}, 
  {value: 'fa fa-plane', category: ['plane', ]}, 
  {value: 'fa fa-plug', category: ['plug', ]}, 
  {value: 'fa fa-plus', category: ['plus', ]}, 
  {value: 'fa fa-plus-circle', category: ['plus', 'circle', ]}, 
  {value: 'fa fa-plus-square', category: ['plus', 'square', ]}, 
  {value: 'fa fa-podcast', category: ['podcast', ]}, 
  {value: 'fa fa-print', category: ['print', ]}, 
  {value: 'fa fa-puzzle-piece', category: ['puzzle', 'piece', ]}, 
  {value: 'fa fa-qrcode', category: ['qrcode', ]}, 
  {value: 'fa fa-question', category: ['question', ]}, 
  {value: 'fa fa-question-circle', category: ['question', 'circle', ]}, 
  {value: 'fa fa-quote-left', category: ['quote', 'left', ]}, 
  {value: 'fa fa-quote-right', category: ['quote', 'right', ]}, 
  {value: 'fa fa-random', category: ['random', ]}, 
  {value: 'fa fa-recycle', category: ['recycle', ]}, 
  {value: 'fa fa-refresh', category: ['refresh', ]}, 
  {value: 'fa fa-registered', category: ['registered', ]}, 
  {value: 'fa fa-remove', category: ['remove', ]}, 
  {value: 'fa fa-reorder', category: ['reorder', ]}, 
  {value: 'fa fa-reply', category: ['reply', ]}, 
  {value: 'fa fa-reply-all', category: ['reply', 'all', ]}, 
  {value: 'fa fa-retweet', category: ['retweet', ]}, 
  {value: 'fa fa-road', category: ['road', ]}, 
  {value: 'fa fa-rocket', category: ['rocket', ]}, 
  {value: 'fa fa-rss', category: ['rss', ]}, 
  {value: 'fa fa-rss-square', category: ['rss', 'square', ]}, 
  {value: 'fa fa-s15', category: ['s15', ]}, 
  {value: 'fa fa-search', category: ['search', ]}, 
  {value: 'fa fa-search-minus', category: ['search', 'minus', ]}, 
  {value: 'fa fa-search-plus', category: ['search', 'plus', ]}, 
  {value: 'fa fa-send', category: ['send', ]}, 
  {value: 'fa fa-server', category: ['server', ]}, 
  {value: 'fa fa-share', category: ['share', ]}, 
  {value: 'fa fa-share-alt', category: ['share', 'alt', ]}, 
  {value: 'fa fa-share-alt-square', category: ['share', 'alt', 'square', ]}, 
  {value: 'fa fa-share-square', category: ['share', 'square', ]}, 
  {value: 'fa fa-shield', category: ['shield', ]}, 
  {value: 'fa fa-ship', category: ['ship', ]}, 
  {value: 'fa fa-shopping-bag', category: ['shopping', 'bag', ]}, 
  {value: 'fa fa-shopping-basket', category: ['shopping', 'basket', ]}, 
  {value: 'fa fa-shopping-cart', category: ['shopping', 'cart', ]}, 
  {value: 'fa fa-shower', category: ['shower', ]}, 
  {value: 'fa fa-sign-in', category: ['sign', 'in', ]}, 
  {value: 'fa fa-sign-language', category: ['sign', 'language', ]}, 
  {value: 'fa fa-signal', category: ['signal', ]}, 
  {value: 'fa fa-signing', category: ['signing', ]}, 
  {value: 'fa fa-sitemap', category: ['sitemap', ]}, 
  {value: 'fa fa-sliders', category: ['sliders', ]}, 
  {value: 'fa fa-sort', category: ['sort', ]}, 
  {value: 'fa fa-sort-alpha-asc', category: ['sort', 'alpha', 'asc', ]}, 
  {value: 'fa fa-sort-alpha-desc', category: ['sort', 'alpha', 'desc', ]}, 
  {value: 'fa fa-sort-amount-asc', category: ['sort', 'amount', 'asc', ]}, 
  {value: 'fa fa-sort-amount-desc', category: ['sort', 'amount', 'desc', ]}, 
  {value: 'fa fa-sort-asc', category: ['sort', 'asc', ]}, 
  {value: 'fa fa-sort-desc', category: ['sort', 'desc', ]}, 
  {value: 'fa fa-sort-down', category: ['sort', 'down', ]}, 
  {value: 'fa fa-sort-numeric-asc', category: ['sort', 'numeric', 'asc', ]}, 
  {value: 'fa fa-sort-numeric-desc', category: ['sort', 'numeric', 'desc', ]}, 
  {value: 'fa fa-sort-up', category: ['sort', 'up', ]}, 
  {value: 'fa fa-space-shuttle', category: ['space', 'shuttle', ]}, 
  {value: 'fa fa-spinner', category: ['spinner', ]}, 
  {value: 'fa fa-spoon', category: ['spoon', ]}, 
  {value: 'fa fa-square', category: ['square', ]}, 
  {value: 'fa fa-star', category: ['star', ]}, 
  {value: 'fa fa-star-half', category: ['star', 'half', ]}, 
  {value: 'fa fa-star-half-empty', category: ['star', 'half', 'empty', ]}, 
  {value: 'fa fa-star-half-full', category: ['star', 'half', 'full', ]}, 
  {value: 'fa fa-sticky-note', category: ['sticky', 'note', ]}, 
  {value: 'fa fa-street-view', category: ['street', 'view', ]}, 
  {value: 'fa fa-suitcase', category: ['suitcase', ]}, 
  {value: 'fa fa-support', category: ['support', ]}, 
  {value: 'fa fa-tablet', category: ['tablet', ]}, 
  {value: 'fa fa-tachometer', category: ['tachometer', ]}, 
  {value: 'fa fa-tag', category: ['tag', ]}, 
  {value: 'fa fa-tags', category: ['tags', ]}, 
  {value: 'fa fa-tasks', category: ['tasks', ]}, 
  {value: 'fa fa-taxi', category: ['taxi', ]}, 
  {value: 'fa fa-television', category: ['television', ]}, 
  {value: 'fa fa-terminal', category: ['terminal', ]}, 
  {value: 'fa fa-thermometer', category: ['thermometer', ]}, 
  {value: 'fa fa-thermometer-0', category: ['thermometer', '0', ]}, 
  {value: 'fa fa-thermometer-1', category: ['thermometer', '1', ]}, 
  {value: 'fa fa-thermometer-2', category: ['thermometer', '2', ]}, 
  {value: 'fa fa-thermometer-3', category: ['thermometer', '3', ]}, 
  {value: 'fa fa-thermometer-4', category: ['thermometer', '4', ]}, 
  {value: 'fa fa-thermometer-empty', category: ['thermometer', 'empty', ]}, 
  {value: 'fa fa-thermometer-full', category: ['thermometer', 'full', ]}, 
  {value: 'fa fa-thermometer-half', category: ['thermometer', 'half', ]}, 
  {value: 'fa fa-thermometer-quarter', category: ['thermometer', 'quarter', ]}, 
  {value: 'fa fa-thermometer-three-quarters', category: ['thermometer', 'three', 'quarters', ]}, 
  {value: 'fa fa-thumb-tack', category: ['thumb', 'tack', ]}, 
  {value: 'fa fa-thumbs-down', category: ['thumbs', 'down', ]}, 
  {value: 'fa fa-thumbs-up', category: ['thumbs', 'up', ]}, 
  {value: 'fa fa-ticket', category: ['ticket', ]}, 
  {value: 'fa fa-times', category: ['times', ]}, 
  {value: 'fa fa-times-circle', category: ['times', 'circle', ]}, 
  {value: 'fa fa-times-rectangle', category: ['times', 'rectangle', ]}, 
  {value: 'fa fa-tint', category: ['tint', ]}, 
  {value: 'fa fa-toggle-down', category: ['toggle', 'down', ]}, 
  {value: 'fa fa-toggle-left', category: ['toggle', 'left', ]}, 
  {value: 'fa fa-toggle-right', category: ['toggle', 'right', ]}, 
  {value: 'fa fa-toggle-up', category: ['toggle', 'up', ]}, 
  {value: 'fa fa-trademark', category: ['trademark', ]}, 
  {value: 'fa fa-trash', category: ['trash', ]}, 
  {value: 'fa fa-tree', category: ['tree', ]}, 
  {value: 'fa fa-trophy', category: ['trophy', ]}, 
  {value: 'fa fa-tty', category: ['tty', ]}, 
  {value: 'fa fa-tv', category: ['tv', ]}, 
  {value: 'fa fa-umbrella', category: ['umbrella', ]}, 
  {value: 'fa fa-universal-access', category: ['universal', 'access', ]}, 
  {value: 'fa fa-university', category: ['university', ]}, 
  {value: 'fa fa-unlock', category: ['unlock', ]}, 
  {value: 'fa fa-unlock-alt', category: ['unlock', 'alt', ]}, 
  {value: 'fa fa-unsorted', category: ['unsorted', ]}, 
  {value: 'fa fa-upload', category: ['upload', ]}, 
  {value: 'fa fa-user', category: ['user', ]}, 
  {value: 'fa fa-user-circle', category: ['user', 'circle', ]}, 
  {value: 'fa fa-user-plus', category: ['user', 'plus', ]}, 
  {value: 'fa fa-user-secret', category: ['user', 'secret', ]}, 
  {value: 'fa fa-user-times', category: ['user', 'times', ]}, 
  {value: 'fa fa-users', category: ['users', ]}, 
  {value: 'fa fa-vcard', category: ['vcard', ]}, 
  {value: 'fa fa-video-camera', category: ['video', 'camera', ]}, 
  {value: 'fa fa-volume-control-phone', category: ['volume', 'control', 'phone', ]}, 
  {value: 'fa fa-volume-down', category: ['volume', 'down', ]}, 
  {value: 'fa fa-volume-up', category: ['volume', 'up', ]}, 
  {value: 'fa fa-warning', category: ['warning', ]}, 
  {value: 'fa fa-wheelchair-alt', category: ['wheelchair', 'alt', ]}, 
  {value: 'fa fa-wifi', category: ['wifi', ]}, 
  {value: 'fa fa-window-close', category: ['window', 'close', ]}, 
  {value: 'fa fa-window-maximize', category: ['window', 'maximize', ]}, 
  {value: 'fa fa-window-minimize', category: ['window', 'minimize', ]}, 
  {value: 'fa fa-window-restore', category: ['window', 'restore', ]}, 
  {value: 'fa fa-wrench', category: ['wrench', ]}, 
  {value: 'fa fa-american-sign-language-interpreting', category: ['american', 'sign', 'language', 'interpreting', ]}, 
  {value: 'fa fa-asl-interpreting', category: ['asl', 'interpreting', ]}, 
  {value: 'fa fa-assistive-listening-systems', category: ['assistive', 'listening', 'systems', ]}, 
  {value: 'fa fa-audio-description', category: ['audio', 'description', ]}, 
  {value: 'fa fa-blind', category: ['blind', ]}, 
  {value: 'fa fa-braille', category: ['braille', ]}, 
  {value: 'fa fa-cc', category: ['cc', ]}, 
  {value: 'fa fa-deaf', category: ['deaf', ]}, 
  {value: 'fa fa-deafness', category: ['deafness', ]}, 
  {value: 'fa fa-low-vision', category: ['low', 'vision', ]}, 
  {value: 'fa fa-sign-language', category: ['sign', 'language', ]}, 
  {value: 'fa fa-signing', category: ['signing', ]}, 
  {value: 'fa fa-tty', category: ['tty', ]}, 
  {value: 'fa fa-universal-access', category: ['universal', 'access', ]}, 
  {value: 'fa fa-volume-control-phone', category: ['volume', 'control', 'phone', ]}, 
  {value: 'fa fa-wheelchair', category: ['wheelchair', ]}, 
  {value: 'fa fa-thumbs-down', category: ['thumbs', 'down', ]}, 
  {value: 'fa fa-thumbs-up', category: ['thumbs', 'up', ]}, 
  {value: 'fa fa-ambulance', category: ['ambulance', ]}, 
  {value: 'fa fa-automobile', category: ['automobile', ]}, 
  {value: 'fa fa-bicycle', category: ['bicycle', ]}, 
  {value: 'fa fa-bus', category: ['bus', ]}, 
  {value: 'fa fa-cab', category: ['cab', ]}, 
  {value: 'fa fa-fighter-jet', category: ['fighter', 'jet', ]}, 
  {value: 'fa fa-motorcycle', category: ['motorcycle', ]}, 
  {value: 'fa fa-plane', category: ['plane', ]}, 
  {value: 'fa fa-rocket', category: ['rocket', ]}, 
  {value: 'fa fa-ship', category: ['ship', ]}, 
  {value: 'fa fa-space-shuttle', category: ['space', 'shuttle', ]}, 
  {value: 'fa fa-subway', category: ['subway', ]}, 
  {value: 'fa fa-taxi', category: ['taxi', ]}, 
  {value: 'fa fa-train', category: ['train', ]}, 
  {value: 'fa fa-truck', category: ['truck', ]}, 
  {value: 'fa fa-genderless', category: ['genderless', ]}, 
  {value: 'fa fa-intersex', category: ['intersex', ]}, 
  {value: 'fa fa-mars', category: ['mars', ]}, 
  {value: 'fa fa-mars-double', category: ['mars', 'double', ]}, 
  {value: 'fa fa-mars-stroke', category: ['mars', 'stroke', ]}, 
  {value: 'fa fa-mars-stroke-h', category: ['mars', 'stroke', 'h', ]}, 
  {value: 'fa fa-mars-stroke-v', category: ['mars', 'stroke', 'v', ]}, 
  {value: 'fa fa-mercury', category: ['mercury', ]}, 
  {value: 'fa fa-neuter', category: ['neuter', ]}, 
  {value: 'fa fa-transgender', category: ['transgender', ]}, 
  {value: 'fa fa-transgender-alt', category: ['transgender', 'alt', ]}, 
  {value: 'fa fa-venus', category: ['venus', ]}, 
  {value: 'fa fa-venus-double', category: ['venus', 'double', ]}, 
  {value: 'fa fa-venus-mars', category: ['venus', 'mars', ]}, 
  {value: 'fa fa-file-text', category: ['file', 'text', ]}, 
  {value: 'fa fa-cog', category: ['cog', ]}, 
  {value: 'fa fa-check-square', category: ['check', 'square', ]}, 
  {value: 'fa fa-circle', category: ['circle', ]}, 
  {value: 'fa fa-minus-square', category: ['minus', 'square', ]}, 
  {value: 'fa fa-plus-square', category: ['plus', 'square', ]}, 
  {value: 'fa fa-square', category: ['square', ]}, 
  {value: 'fa fa-cc-amex', category: ['cc', 'amex', ]}, 
  {value: 'fa fa-cc-diners-club', category: ['cc', 'diners', 'club', ]}, 
  {value: 'fa fa-cc-discover', category: ['cc', 'discover', ]}, 
  {value: 'fa fa-cc-jcb', category: ['cc', 'jcb', ]}, 
  {value: 'fa fa-cc-mastercard', category: ['cc', 'mastercard', ]}, 
  {value: 'fa fa-cc-paypal', category: ['cc', 'paypal', ]}, 
  {value: 'fa fa-cc-stripe', category: ['cc', 'stripe', ]}, 
  {value: 'fa fa-cc-visa', category: ['cc', 'visa', ]}, 
  {value: 'fa fa-google-wallet', category: ['google', 'wallet', ]}, 
  {value: 'fa fa-paypal', category: ['paypal', ]}, 
  {value: 'fa fa-area-chart', category: ['area', 'chart', ]}, 
  {value: 'fa fa-bar-chart', category: ['bar', 'chart', ]}, 
  {value: 'fa fa-line-chart', category: ['line', 'chart', ]}, 
  {value: 'fa fa-pie-chart', category: ['pie', 'chart', ]}, 
  {value: 'fa fa-bitcoin', category: ['bitcoin', ]}, 
  {value: 'fa fa-btc', category: ['btc', ]}, 
  {value: 'fa fa-cny', category: ['cny', ]}, 
  {value: 'fa fa-dollar', category: ['dollar', ]}, 
  {value: 'fa fa-eur', category: ['eur', ]}, 
  {value: 'fa fa-euro', category: ['euro', ]}, 
  {value: 'fa fa-gbp', category: ['gbp', ]}, 
  {value: 'fa fa-gg', category: ['gg', ]}, 
  {value: 'fa fa-gg-circle', category: ['gg', 'circle', ]}, 
  {value: 'fa fa-ils', category: ['ils', ]}, 
  {value: 'fa fa-inr', category: ['inr', ]}, 
  {value: 'fa fa-jpy', category: ['jpy', ]}, 
  {value: 'fa fa-krw', category: ['krw', ]}, 
  {value: 'fa fa-money', category: ['money', ]}, 
  {value: 'fa fa-rmb', category: ['rmb', ]}, 
  {value: 'fa fa-rouble', category: ['rouble', ]}, 
  {value: 'fa fa-rub', category: ['rub', ]}, 
  {value: 'fa fa-ruble', category: ['ruble', ]}, 
  {value: 'fa fa-rupee', category: ['rupee', ]}, 
  {value: 'fa fa-shekel', category: ['shekel', ]}, 
  {value: 'fa fa-sheqel', category: ['sheqel', ]}, 
  {value: 'fa fa-try', category: ['try', ]}, 
  {value: 'fa fa-turkish-lira', category: ['turkish', 'lira', ]}, 
  {value: 'fa fa-usd', category: ['usd', ]}, 
  {value: 'fa fa-viacoin', category: ['viacoin', ]}, 
  {value: 'fa fa-won', category: ['won', ]}, 
  {value: 'fa fa-yen', category: ['yen', ]}, 
  {value: 'fa fa-align-center', category: ['align', 'center', ]}, 
  {value: 'fa fa-align-justify', category: ['align', 'justify', ]}, 
  {value: 'fa fa-align-left', category: ['align', 'left', ]}, 
  {value: 'fa fa-align-right', category: ['align', 'right', ]}, 
  {value: 'fa fa-bold', category: ['bold', ]}, 
  {value: 'fa fa-chain', category: ['chain', ]}, 
  {value: 'fa fa-chain-broken', category: ['chain', 'broken', ]}, 
  {value: 'fa fa-clipboard', category: ['clipboard', ]}, 
  {value: 'fa fa-columns', category: ['columns', ]}, 
  {value: 'fa fa-copy', category: ['copy', ]}, 
  {value: 'fa fa-cut', category: ['cut', ]}, 
  {value: 'fa fa-dedent', category: ['dedent', ]}, 
  {value: 'fa fa-eraser', category: ['eraser', ]}, 
  {value: 'fa fa-file', category: ['file', ]}, 
  {value: 'fa fa-file-text', category: ['file', 'text', ]}, 
  {value: 'fa fa-font', category: ['font', ]}, 
  {value: 'fa fa-header', category: ['header', ]}, 
  {value: 'fa fa-indent', category: ['indent', ]}, 
  {value: 'fa fa-italic', category: ['italic', ]}, 
  {value: 'fa fa-link', category: ['link', ]}, 
  {value: 'fa fa-list', category: ['list', ]}, 
  {value: 'fa fa-list-alt', category: ['list', 'alt', ]}, 
  {value: 'fa fa-list-ul', category: ['list', 'ul', ]}, 
  {value: 'fa fa-paperclip', category: ['paperclip', ]}, 
  {value: 'fa fa-paragraph', category: ['paragraph', ]}, 
  {value: 'fa fa-paste', category: ['paste', ]}, 
  {value: 'fa fa-repeat', category: ['repeat', ]}, 
  {value: 'fa fa-rotate-left', category: ['rotate', 'left', ]}, 
  {value: 'fa fa-rotate-right', category: ['rotate', 'right', ]}, 
  {value: 'fa fa-save', category: ['save', ]}, 
  {value: 'fa fa-scissors', category: ['scissors', ]}, 
  {value: 'fa fa-strikethrough', category: ['strikethrough', ]}, 
  {value: 'fa fa-subscript', category: ['subscript', ]}, 
  {value: 'fa fa-superscript', category: ['superscript', ]}, 
  {value: 'fa fa-table', category: ['table', ]}, 
  {value: 'fa fa-text-height', category: ['text', 'height', ]}, 
  {value: 'fa fa-text-width', category: ['text', 'width', ]}, 
  {value: 'fa fa-th', category: ['th', ]}, 
  {value: 'fa fa-th-large', category: ['th', 'large', ]}, 
  {value: 'fa fa-th-list', category: ['th', 'list', ]}, 
  {value: 'fa fa-underline', category: ['underline', ]}, 
  {value: 'fa fa-undo', category: ['undo', ]}, 
  {value: 'fa fa-unlink', category: ['unlink', ]}, 
  {value: 'fa fa-angle-double-down', category: ['angle', 'double', 'down', ]}, 
  {value: 'fa fa-angle-double-left', category: ['angle', 'double', 'left', ]}, 
  {value: 'fa fa-angle-double-right', category: ['angle', 'double', 'right', ]}, 
  {value: 'fa fa-angle-double-up', category: ['angle', 'double', 'up', ]}, 
  {value: 'fa fa-angle-down', category: ['angle', 'down', ]}, 
  {value: 'fa fa-angle-left', category: ['angle', 'left', ]}, 
  {value: 'fa fa-angle-right', category: ['angle', 'right', ]}, 
  {value: 'fa fa-angle-up', category: ['angle', 'up', ]}, 
  {value: 'fa fa-arrow-circle-down', category: ['arrow', 'circle', 'down', ]}, 
  {value: 'fa fa-arrow-circle-left', category: ['arrow', 'circle', 'left', ]}, 
  {value: 'fa fa-arrow-circle-right', category: ['arrow', 'circle', 'right', ]}, 
  {value: 'fa fa-arrow-circle-up', category: ['arrow', 'circle', 'up', ]}, 
  {value: 'fa fa-arrow-down', category: ['arrow', 'down', ]}, 
  {value: 'fa fa-arrow-left', category: ['arrow', 'left', ]}, 
  {value: 'fa fa-arrow-right', category: ['arrow', 'right', ]}, 
  {value: 'fa fa-arrow-up', category: ['arrow', 'up', ]}, 
  {value: 'fa fa-arrows-alt', category: ['arrows', 'alt', ]}, 
  {value: 'fa fa-caret-down', category: ['caret', 'down', ]}, 
  {value: 'fa fa-caret-left', category: ['caret', 'left', ]}, 
  {value: 'fa fa-caret-right', category: ['caret', 'right', ]}, 
  {value: 'fa fa-caret-up', category: ['caret', 'up', ]}, 
  {value: 'fa fa-chevron-circle-down', category: ['chevron', 'circle', 'down', ]}, 
  {value: 'fa fa-chevron-circle-left', category: ['chevron', 'circle', 'left', ]}, 
  {value: 'fa fa-chevron-circle-right', category: ['chevron', 'circle', 'right', ]}, 
  {value: 'fa fa-chevron-circle-up', category: ['chevron', 'circle', 'up', ]}, 
  {value: 'fa fa-chevron-down', category: ['chevron', 'down', ]}, 
  {value: 'fa fa-chevron-left', category: ['chevron', 'left', ]}, 
  {value: 'fa fa-chevron-right', category: ['chevron', 'right', ]}, 
  {value: 'fa fa-chevron-up', category: ['chevron', 'up', ]}, 
  {value: 'fa fa-long-arrow-down', category: ['long', 'arrow', 'down', ]}, 
  {value: 'fa fa-long-arrow-left', category: ['long', 'arrow', 'left', ]}, 
  {value: 'fa fa-long-arrow-right', category: ['long', 'arrow', 'right', ]}, 
  {value: 'fa fa-long-arrow-up', category: ['long', 'arrow', 'up', ]}, 
  {value: 'fa fa-toggle-down', category: ['toggle', 'down', ]}, 
  {value: 'fa fa-toggle-left', category: ['toggle', 'left', ]}, 
  {value: 'fa fa-toggle-right', category: ['toggle', 'right', ]}, 
  {value: 'fa fa-toggle-up', category: ['toggle', 'up', ]}, 
  {value: 'fa fa-backward', category: ['backward', ]}, 
  {value: 'fa fa-compress', category: ['compress', ]}, 
  {value: 'fa fa-eject', category: ['eject', ]}, 
  {value: 'fa fa-expand', category: ['expand', ]}, 
  {value: 'fa fa-fast-backward', category: ['fast', 'backward', ]}, 
  {value: 'fa fa-fast-forward', category: ['fast', 'forward', ]}, 
  {value: 'fa fa-forward', category: ['forward', ]}, 
  {value: 'fa fa-pause', category: ['pause', ]}, 
  {value: 'fa fa-pause-circle', category: ['pause', 'circle', ]}, 
  {value: 'fa fa-play', category: ['play', ]}, 
  {value: 'fa fa-play-circle', category: ['play', 'circle', ]}, 
  {value: 'fa fa-random', category: ['random', ]}, 
  {value: 'fa fa-step-backward', category: ['step', 'backward', ]}, 
  {value: 'fa fa-step-forward', category: ['step', 'forward', ]}, 
  {value: 'fa fa-stop', category: ['stop', ]}, 
  {value: 'fa fa-stop-circle', category: ['stop', 'circle', ]}, 
  {value: 'fa fa-youtube-play', category: ['youtube', 'play', ]}, 
  {value: 'fa fa-500px', category: ['500px', ]}, 
  {value: 'fa fa-adn', category: ['adn', ]}, 
  {value: 'fa fa-amazon', category: ['amazon', ]}, 
  {value: 'fa fa-android', category: ['android', ]}, 
  {value: 'fa fa-angellist', category: ['angellist', ]}, 
  {value: 'fa fa-apple', category: ['apple', ]}, 
  {value: 'fa fa-behance', category: ['behance', ]}, 
  {value: 'fa fa-behance-square', category: ['behance', 'square', ]}, 
  {value: 'fa fa-bitbucket', category: ['bitbucket', ]}, 
  {value: 'fa fa-bitbucket-square', category: ['bitbucket', 'square', ]}, 
  {value: 'fa fa-black-tie', category: ['black', 'tie', ]}, 
  {value: 'fa fa-bluetooth', category: ['bluetooth', ]}, 
  {value: 'fa fa-bluetooth-b', category: ['bluetooth', 'b', ]}, 
  {value: 'fa fa-btc', category: ['btc', ]}, 
  {value: 'fa fa-buysellads', category: ['buysellads', ]}, 
  {value: 'fa fa-cc-amex', category: ['cc', 'amex', ]}, 
  {value: 'fa fa-cc-diners-club', category: ['cc', 'diners', 'club', ]}, 
  {value: 'fa fa-cc-discover', category: ['cc', 'discover', ]}, 
  {value: 'fa fa-cc-jcb', category: ['cc', 'jcb', ]}, 
  {value: 'fa fa-cc-mastercard', category: ['cc', 'mastercard', ]}, 
  {value: 'fa fa-cc-paypal', category: ['cc', 'paypal', ]}, 
  {value: 'fa fa-cc-stripe', category: ['cc', 'stripe', ]}, 
  {value: 'fa fa-cc-visa', category: ['cc', 'visa', ]}, 
  {value: 'fa fa-chrome', category: ['chrome', ]}, 
  {value: 'fa fa-codepen', category: ['codepen', ]}, 
  {value: 'fa fa-codiepie', category: ['codiepie', ]}, 
  {value: 'fa fa-connectdevelop', category: ['connectdevelop', ]}, 
  {value: 'fa fa-contao', category: ['contao', ]}, 
  {value: 'fa fa-css3', category: ['css3', ]}, 
  {value: 'fa fa-dashcube', category: ['dashcube', ]}, 
  {value: 'fa fa-delicious', category: ['delicious', ]}, 
  {value: 'fa fa-deviantart', category: ['deviantart', ]}, 
  {value: 'fa fa-digg', category: ['digg', ]}, 
  {value: 'fa fa-dribbble', category: ['dribbble', ]}, 
  {value: 'fa fa-dropbox', category: ['dropbox', ]}, 
  {value: 'fa fa-drupal', category: ['drupal', ]}, 
  {value: 'fa fa-edge', category: ['edge', ]}, 
  {value: 'fa fa-eercast', category: ['eercast', ]}, 
  {value: 'fa fa-empire', category: ['empire', ]}, 
  {value: 'fa fa-envira', category: ['envira', ]}, 
  {value: 'fa fa-etsy', category: ['etsy', ]}, 
  {value: 'fa fa-expeditedssl', category: ['expeditedssl', ]}, 
  {value: 'fa fa-fa', category: ['fa', ]}, 
  {value: 'fa-brands fa-instagram', category: ['brand','instagram' ]}, 
  {value: 'fa-brands fa-twitter', category: ['brand', 'twitter', ]}, 
  {value: 'fa-brands fa-x-twitter', category: ['brand', 'x', ]}, 
  {value: 'fa fa-firefox', category: ['firefox', ]}, 
  {value: 'fa fa-flickr', category: ['flickr', ]}, 
  {value: 'fa fa-font-awesome', category: ['font', 'awesome', ]}, 
  {value: 'fa fa-fonticons', category: ['fonticons', ]}, 
  {value: 'fa fa-fort-awesome', category: ['fort', 'awesome', ]}, 
  {value: 'fa fa-forumbee', category: ['forumbee', ]}, 
  {value: 'fa fa-foursquare', category: ['foursquare', ]}, 
  {value: 'fa fa-free-code-camp', category: ['free', 'code', 'camp', ]}, 
  {value: 'fa fa-ge', category: ['ge', ]}, 
  {value: 'fa fa-get-pocket', category: ['get', 'pocket', ]}, 
  {value: 'fa fa-gg', category: ['gg', ]}, 
  {value: 'fa fa-gg-circle', category: ['gg', 'circle', ]}, 
  {value: 'fa fa-git', category: ['git', ]}, 
  {value: 'fa fa-git-square', category: ['git', 'square', ]}, 
  {value: 'fa fa-github', category: ['github', ]}, 
  {value: 'fa fa-github-alt', category: ['github', 'alt', ]}, 
  {value: 'fa fa-github-square', category: ['github', 'square', ]}, 
  {value: 'fa fa-gitlab', category: ['gitlab', ]}, 
  {value: 'fa fa-gittip', category: ['gittip', ]}, 
  {value: 'fa fa-glide', category: ['glide', ]}, 
  {value: 'fa fa-glide-g', category: ['glide', 'g', ]}, 
  {value: 'fa fa-google', category: ['google', ]}, 
  {value: 'fa fa-google-plus', category: ['google', 'plus', ]}, 
  {value: 'fa fa-google-plus-circle', category: ['google', 'plus', 'circle', ]}, 
  {value: 'fa fa-google-plus-square', category: ['google', 'plus', 'square', ]}, 
  {value: 'fa fa-google-wallet', category: ['google', 'wallet', ]}, 
  {value: 'fa fa-gratipay', category: ['gratipay', ]}, 
  {value: 'fa fa-grav', category: ['grav', ]}, 
  {value: 'fa fa-hacker-news', category: ['hacker', 'news', ]}, 
  {value: 'fa fa-houzz', category: ['houzz', ]}, 
  {value: 'fa fa-html5', category: ['html5', ]}, 
  {value: 'fa fa-imdb', category: ['imdb', ]}, 
  {value: 'fa fa-instagram', category: ['instagram', ]}, 
  {value: 'fa fa-internet-explorer', category: ['internet', 'explorer', ]}, 
  {value: 'fa fa-ioxhost', category: ['ioxhost', ]}, 
  {value: 'fa fa-joomla', category: ['joomla', ]}, 
  {value: 'fa fa-jsfiddle', category: ['jsfiddle', ]}, 
  {value: 'fa fa-lastfm', category: ['lastfm', ]}, 
  {value: 'fa fa-lastfm-square', category: ['lastfm', 'square', ]}, 
  {value: 'fa fa-leanpub', category: ['leanpub', ]}, 
  {value: 'fa fa-linkedin', category: ['linkedin', ]}, 
  {value: 'fa fa-linkedin-square', category: ['linkedin', 'square', ]}, 
  {value: 'fa fa-linode', category: ['linode', ]}, 
  {value: 'fa fa-linux', category: ['linux', ]}, 
  {value: 'fa fa-maxcdn', category: ['maxcdn', ]}, 
  {value: 'fa fa-meanpath', category: ['meanpath', ]}, 
  {value: 'fa fa-medium', category: ['medium', ]}, 
  {value: 'fa fa-meetup', category: ['meetup', ]}, 
  {value: 'fa fa-mixcloud', category: ['mixcloud', ]}, 
  {value: 'fa fa-modx', category: ['modx', ]}, 
  {value: 'fa fa-pagelines', category: ['pagelines', ]}, 
  {value: 'fa fa-paypal', category: ['paypal', ]}, 
  {value: 'fa fa-pied-piper', category: ['pied', 'piper', ]}, 
  {value: 'fa fa-pied-piper-alt', category: ['pied', 'piper', 'alt', ]}, 
  {value: 'fa fa-pied-piper-pp', category: ['pied', 'piper', 'pp', ]}, 
  {value: 'fa fa-pinterest', category: ['pinterest', ]}, 
  {value: 'fa fa-pinterest-p', category: ['pinterest', 'p', ]}, 
  {value: 'fa fa-pinterest-square', category: ['pinterest', 'square', ]}, 
  {value: 'fa fa-product-hunt', category: ['product', 'hunt', ]}, 
  {value: 'fa fa-qq', category: ['qq', ]}, 
  {value: 'fa fa-quora', category: ['quora', ]}, 
  {value: 'fa fa-ra', category: ['ra', ]}, 
  {value: 'fa fa-ravelry', category: ['ravelry', ]}, 
  {value: 'fa fa-rebel', category: ['rebel', ]}, 
  {value: 'fa fa-reddit', category: ['reddit', ]}, 
  {value: 'fa fa-reddit-alien', category: ['reddit', 'alien', ]}, 
  {value: 'fa fa-reddit-square', category: ['reddit', 'square', ]}, 
  {value: 'fa fa-renren', category: ['renren', ]}, 
  {value: 'fa fa-resistance', category: ['resistance', ]}, 
  {value: 'fa fa-safari', category: ['safari', ]}, 
  {value: 'fa fa-scribd', category: ['scribd', ]}, 
  {value: 'fa fa-sellsy', category: ['sellsy', ]}, 
  {value: 'fa fa-share-alt', category: ['share', 'alt', ]}, 
  {value: 'fa fa-share-alt-square', category: ['share', 'alt', 'square', ]}, 
  {value: 'fa fa-shirtsinbulk', category: ['shirtsinbulk', ]}, 
  {value: 'fa fa-simplybuilt', category: ['simplybuilt', ]}, 
  {value: 'fa fa-skyatlas', category: ['skyatlas', ]}, 
  {value: 'fa fa-skype', category: ['skype', ]}, 
  {value: 'fa fa-slack', category: ['slack', ]}, 
  {value: 'fa fa-slideshare', category: ['slideshare', ]}, 
  {value: 'fa fa-snapchat', category: ['snapchat', ]}, 
  {value: 'fa fa-snapchat-ghost', category: ['snapchat', 'ghost', ]}, 
  {value: 'fa fa-snapchat-square', category: ['snapchat', 'square', ]}, 
  {value: 'fa fa-soundcloud', category: ['soundcloud', ]}, 
  {value: 'fa fa-spotify', category: ['spotify', ]}, 
  {value: 'fa fa-stack-exchange', category: ['stack', 'exchange', ]}, 
  {value: 'fa fa-steam', category: ['steam', ]}, 
  {value: 'fa fa-steam-square', category: ['steam', 'square', ]}, 
  {value: 'fa fa-stumbleupon', category: ['stumbleupon', ]}, 
  {value: 'fa fa-stumbleupon-circle', category: ['stumbleupon', 'circle', ]}, 
  {value: 'fa fa-superpowers', category: ['superpowers', ]}, 
  {value: 'fa fa-tencent-weibo', category: ['tencent', 'weibo', ]}, 
  {value: 'fa fa-themeisle', category: ['themeisle', ]}, 
  {value: 'fa fa-trello', category: ['trello', ]}, 
  {value: 'fa fa-tripadvisor', category: ['tripadvisor', ]}, 
  {value: 'fa fa-tumblr', category: ['tumblr', ]}, 
  {value: 'fa fa-tumblr-square', category: ['tumblr', 'square', ]}, 
  {value: 'fa fa-twitch', category: ['twitch', ]}, 
  {value: 'fa fa-twitter', category: ['twitter', ]}, 
  {value: 'fa fa-twitter-square', category: ['twitter', 'square', ]}, 
  {value: 'fa fa-usb', category: ['usb', ]}, 
  {value: 'fa fa-viacoin', category: ['viacoin', ]}, 
  {value: 'fa fa-viadeo', category: ['viadeo', ]}, 
  {value: 'fa fa-viadeo-square', category: ['viadeo', 'square', ]}, 
  {value: 'fa fa-vimeo', category: ['vimeo', ]}, 
  {value: 'fa fa-vimeo-square', category: ['vimeo', 'square', ]}, 
  {value: 'fa fa-vine', category: ['vine', ]}, 
  {value: 'fa fa-vk', category: ['vk', ]}, 
  {value: 'fa fa-wechat', category: ['wechat', ]}, 
  {value: 'fa fa-weibo', category: ['weibo', ]}, 
  {value: 'fa fa-weixin', category: ['weixin', ]}, 
  {value: 'fa fa-whatsapp', category: ['whatsapp', ]}, 
  {value: 'fa fa-wikipedia-w', category: ['wikipedia', 'w', ]}, 
  {value: 'fa fa-windows', category: ['windows', ]}, 
  {value: 'fa fa-wordpress', category: ['wordpress', ]}, 
  {value: 'fa fa-wpbeginner', category: ['wpbeginner', ]}, 
  {value: 'fa fa-wpexplorer', category: ['wpexplorer', ]}, 
  {value: 'fa fa-wpforms', category: ['wpforms', ]}, 
  {value: 'fa fa-xing', category: ['xing', ]}, 
  {value: 'fa fa-xing-square', category: ['xing', 'square', ]}, 
  {value: 'fa fa-y-combinator', category: ['y', 'combinator', ]}, 
  {value: 'fa fa-y-combinator-square', category: ['y', 'combinator', 'square', ]}, 
  {value: 'fa fa-yahoo', category: ['yahoo', ]}, 
  {value: 'fa fa-yc', category: ['yc', ]}, 
  {value: 'fa fa-yc-square', category: ['yc', 'square', ]}, 
  {value: 'fa fa-yelp', category: ['yelp', ]}, 
  {value: 'fa fa-yoast', category: ['yoast', ]}, 
  {value: 'fa fa-youtube', category: ['youtube', ]}, 
  {value: 'fa fa-youtube-play', category: ['youtube', 'play', ]}, 
  {value: 'fa fa-youtube-square', category: ['youtube', 'square', ]}, 
  {value: 'fa fa-ambulance', category: ['ambulance', ]}, 
  {value: 'fa fa-h-square', category: ['h', 'square', ]}, 
  {value: 'fa fa-heart', category: ['heart', ]}, 
  {value: 'fa fa-heartbeat', category: ['heartbeat', ]}, 
  {value: 'fa fa-medkit', category: ['medkit', ]}, 
  {value: 'fa fa-plus-square', category: ['plus', 'square', ]}, 
  {value: 'fa fa-stethoscope', category: ['stethoscope', ]}, 
  {value: 'fa fa-user-md', category: ['user', 'md', ]}, 
  {value: 'fas fa-ad', category: ['ad', ]}, 
  {value: 'fas fa-air-freshener', category: ['air', 'freshener', ]}, 
  {value: 'fas fa-allergies', category: ['allergies', ]}, 
  {value: 'fas fa-angry', category: ['angry', ]}, 
  {value: 'fas fa-ankh', category: ['ankh', ]}, 
  {value: 'fas fa-apple-alt', category: ['apple', 'alt', ]}, 
  {value: 'fas fa-archway', category: ['archway', ]}, 
  {value: 'fas fa-arrow-alt-circle-down', category: ['arrow', 'alt', 'circle', 'down', ]}, 
  {value: 'fas fa-arrow-alt-circle-left', category: ['arrow', 'alt', 'circle', 'left', ]}, 
  {value: 'fas fa-arrow-alt-circle-right', category: ['arrow', 'alt', 'circle', 'right', ]}, 
  {value: 'fas fa-arrow-alt-circle-up', category: ['arrow', 'alt', 'circle', 'up', ]}, 
  {value: 'fas fa-arrows-alt-h', category: ['arrows', 'alt', 'h', ]}, 
  {value: 'fas fa-arrows-alt-v', category: ['arrows', 'alt', 'v', ]}, 
  {value: 'fas fa-atlas', category: ['atlas', ]}, 
  {value: 'fas fa-atom', category: ['atom', ]}, 
  {value: 'fas fa-award', category: ['award', ]}, 
  {value: 'fas fa-baby', category: ['baby', ]}, 
  {value: 'fas fa-baby-carriage', category: ['baby', 'carriage', ]}, 
  {value: 'fas fa-backspace', category: ['backspace', ]}, 
  {value: 'fas fa-bacon', category: ['bacon', ]}, 
  {value: 'fas fa-bacteria', category: ['bacteria', ]}, 
  {value: 'fas fa-bacterium', category: ['bacterium', ]}, 
  {value: 'fas fa-bahai', category: ['bahai', ]}, 
  {value: 'fas fa-balance-scale-left', category: ['balance', 'scale', 'left', ]}, 
  {value: 'fas fa-balance-scale-right', category: ['balance', 'scale', 'right', ]}, 
  {value: 'fas fa-band-aid', category: ['band', 'aid', ]}, 
  {value: 'fas fa-baseball-ball', category: ['baseball', 'ball', ]}, 
  {value: 'fas fa-basketball-ball', category: ['basketball', 'ball', ]}, 
  {value: 'fas fa-bezier-curve', category: ['bezier', 'curve', ]}, 
  {value: 'fas fa-bible', category: ['bible', ]}, 
  {value: 'fas fa-biking', category: ['biking', ]}, 
  {value: 'fas fa-biohazard', category: ['biohazard', ]}, 
  {value: 'fas fa-blender', category: ['blender', ]}, 
  {value: 'fas fa-blender-phone', category: ['blender', 'phone', ]}, 
  {value: 'fas fa-blog', category: ['blog', ]}, 
  {value: 'fas fa-bone', category: ['bone', ]}, 
  {value: 'fas fa-bong', category: ['bong', ]}, 
  {value: 'fas fa-book-dead', category: ['book', 'dead', ]}, 
  {value: 'fas fa-book-medical', category: ['book', 'medical', ]}, 
  {value: 'fas fa-book-reader', category: ['book', 'reader', ]}, 
  {value: 'fas fa-border-all', category: ['border', 'all', ]}, 
  {value: 'fas fa-border-none', category: ['border', 'none', ]}, 
  {value: 'fas fa-border-style', category: ['border', 'style', ]}, 
  {value: 'fas fa-bowling-ball', category: ['bowling', 'ball', ]}, 
  {value: 'fas fa-box', category: ['box', ]}, 
  {value: 'fas fa-box-tissue', category: ['box', 'tissue', ]}, 
  {value: 'fas fa-boxes', category: ['boxes', ]}, 
  {value: 'fas fa-brain', category: ['brain', ]}, 
  {value: 'fas fa-bread-slice', category: ['bread', 'slice', ]}, 
  {value: 'fas fa-briefcase-medical', category: ['briefcase', 'medical', ]}, 
  {value: 'fas fa-broadcast-tower', category: ['broadcast', 'tower', ]}, 
  {value: 'fas fa-broom', category: ['broom', ]}, 
  {value: 'fas fa-brush', category: ['brush', ]}, 
  {value: 'fas fa-burn', category: ['burn', ]}, 
  {value: 'fas fa-bus-alt', category: ['bus', 'alt', ]}, 
  {value: 'fas fa-business-time', category: ['business', 'time', ]}, 
  {value: 'fas fa-calendar-alt', category: ['calendar', 'alt', ]}, 
  {value: 'fas fa-calendar-check', category: ['calendar', 'check', ]}, 
  {value: 'fas fa-calendar-day', category: ['calendar', 'day', ]}, 
  {value: 'fas fa-calendar-minus', category: ['calendar', 'minus', ]}, 
  {value: 'fas fa-calendar-plus', category: ['calendar', 'plus', ]}, 
  {value: 'fas fa-calendar-times', category: ['calendar', 'times', ]}, 
  {value: 'fas fa-calendar-week', category: ['calendar', 'week', ]}, 
  {value: 'fas fa-campground', category: ['campground', ]}, 
  {value: 'fas fa-candy-cane', category: ['candy', 'cane', ]}, 
  {value: 'fas fa-cannabis', category: ['cannabis', ]}, 
  {value: 'fas fa-capsules', category: ['capsules', ]}, 
  {value: 'fas fa-car-alt', category: ['car', 'alt', ]}, 
  {value: 'fas fa-car-battery', category: ['car', 'battery', ]}, 
  {value: 'fas fa-car-crash', category: ['car', 'crash', ]}, 
  {value: 'fas fa-car-side', category: ['car', 'side', ]}, 
  {value: 'fas fa-caravan', category: ['caravan', ]}, 
  {value: 'fas fa-caret-square-down', category: ['caret', 'square', 'down', ]}, 
  {value: 'fas fa-caret-square-left', category: ['caret', 'square', 'left', ]}, 
  {value: 'fas fa-caret-square-right', category: ['caret', 'square', 'right', ]}, 
  {value: 'fas fa-caret-square-up', category: ['caret', 'square', 'up', ]}, 
  {value: 'fas fa-carrot', category: ['carrot', ]}, 
  {value: 'fas fa-cash-register', category: ['cash', 'register', ]}, 
  {value: 'fas fa-cat', category: ['cat', ]}, 
  {value: 'fas fa-chair', category: ['chair', ]}, 
  {value: 'fas fa-chalkboard', category: ['chalkboard', ]}, 
  {value: 'fas fa-chalkboard-teacher', category: ['chalkboard', 'teacher', ]}, 
  {value: 'fas fa-charging-station', category: ['charging', 'station', ]}, 
  {value: 'fas fa-chart-area', category: ['chart', 'area', ]}, 
  {value: 'fas fa-chart-bar', category: ['chart', 'bar', ]}, 
  {value: 'fas fa-chart-line', category: ['chart', 'line', ]}, 
  {value: 'fas fa-chart-pie', category: ['chart', 'pie', ]}, 
  {value: 'fas fa-check-double', category: ['check', 'double', ]}, 
  {value: 'fas fa-cheese', category: ['cheese', ]}, 
  {value: 'fas fa-chess', category: ['chess', ]}, 
  {value: 'fas fa-chess-bishop', category: ['chess', 'bishop', ]}, 
  {value: 'fas fa-chess-board', category: ['chess', 'board', ]}, 
  {value: 'fas fa-chess-king', category: ['chess', 'king', ]}, 
  {value: 'fas fa-chess-knight', category: ['chess', 'knight', ]}, 
  {value: 'fas fa-chess-pawn', category: ['chess', 'pawn', ]}, 
  {value: 'fas fa-chess-queen', category: ['chess', 'queen', ]}, 
  {value: 'fas fa-chess-rook', category: ['chess', 'rook', ]}, 
  {value: 'fas fa-church', category: ['church', ]}, 
  {value: 'fas fa-circle-notch', category: ['circle', 'notch', ]}, 
  {value: 'fas fa-city', category: ['city', ]}, 
  {value: 'fas fa-clinic-medical', category: ['clinic', 'medical', ]}, 
  {value: 'fas fa-clipboard-check', category: ['clipboard', 'check', ]}, 
  {value: 'fas fa-clipboard-list', category: ['clipboard', 'list', ]}, 
  {value: 'fas fa-clock', category: ['clock', ]}, 
  {value: 'fas fa-closed-captioning', category: ['closed', 'captioning', ]}, 
  {value: 'fas fa-cloud-download-alt', category: ['cloud', 'download', 'alt', ]}, 
  {value: 'fas fa-cloud-meatball', category: ['cloud', 'meatball', ]}, 
  {value: 'fas fa-cloud-moon', category: ['cloud', 'moon', ]}, 
  {value: 'fas fa-cloud-moon-rain', category: ['cloud', 'moon', 'rain', ]}, 
  {value: 'fas fa-cloud-rain', category: ['cloud', 'rain', ]}, 
  {value: 'fas fa-cloud-showers-heavy', category: ['cloud', 'showers', 'heavy', ]}, 
  {value: 'fas fa-cloud-sun', category: ['cloud', 'sun', ]}, 
  {value: 'fas fa-cloud-sun-rain', category: ['cloud', 'sun', 'rain', ]}, 
  {value: 'fas fa-cloud-upload-alt', category: ['cloud', 'upload', 'alt', ]}, 
  {value: 'fas fa-cocktail', category: ['cocktail', ]}, 
  {value: 'fas fa-code-branch', category: ['code', 'branch', ]}, 
  {value: 'fas fa-coins', category: ['coins', ]}, 
  {value: 'fas fa-comment-alt', category: ['comment', 'alt', ]}, 
  {value: 'fas fa-comment-dollar', category: ['comment', 'dollar', ]}, 
  {value: 'fas fa-comment-dots', category: ['comment', 'dots', ]}, 
  {value: 'fas fa-comment-medical', category: ['comment', 'medical', ]}, 
  {value: 'fas fa-comment-slash', category: ['comment', 'slash', ]}, 
  {value: 'fas fa-comments-dollar', category: ['comments', 'dollar', ]}, 
  {value: 'fas fa-compact-disc', category: ['compact', 'disc', ]}, 
  {value: 'fas fa-compress-alt', category: ['compress', 'alt', ]}, 
  {value: 'fas fa-compress-arrows-alt', category: ['compress', 'arrows', 'alt', ]}, 
  {value: 'fas fa-concierge-bell', category: ['concierge', 'bell', ]}, 
  {value: 'fas fa-cookie', category: ['cookie', ]}, 
  {value: 'fas fa-cookie-bite', category: ['cookie', 'bite', ]}, 
  {value: 'fas fa-couch', category: ['couch', ]}, 
  {value: 'fas fa-crop-alt', category: ['crop', 'alt', ]}, 
  {value: 'fas fa-cross', category: ['cross', ]}, 
  {value: 'fas fa-crow', category: ['crow', ]}, 
  {value: 'fas fa-crown', category: ['crown', ]}, 
  {value: 'fas fa-crutch', category: ['crutch', ]}, 
  {value: 'fas fa-democrat', category: ['democrat', ]}, 
  {value: 'fas fa-dharmachakra', category: ['dharmachakra', ]}, 
  {value: 'fas fa-diagnoses', category: ['diagnoses', ]}, 
  {value: 'fas fa-dice', category: ['dice', ]}, 
  {value: 'fas fa-dice-d20', category: ['dice', 'd20', ]}, 
  {value: 'fas fa-dice-d6', category: ['dice', 'd6', ]}, 
  {value: 'fas fa-dice-five', category: ['dice', 'five', ]}, 
  {value: 'fas fa-dice-four', category: ['dice', 'four', ]}, 
  {value: 'fas fa-dice-six', category: ['dice', 'six', ]}, 
  {value: 'fas fa-dice-three', category: ['dice', 'three', ]}, 
  {value: 'fas fa-dice-two', category: ['dice', 'two', ]}, 
  {value: 'fas fa-digital-tachograph', category: ['digital', 'tachograph', ]}, 
  {value: 'fas fa-directions', category: ['directions', ]}, 
  {value: 'fas fa-disease', category: ['disease', ]}, 
  {value: 'fas fa-divide', category: ['divide', ]}, 
  {value: 'fas fa-dizzy', category: ['dizzy', ]}, 
  {value: 'fas fa-dna', category: ['dna', ]}, 
  {value: 'fas fa-dog', category: ['dog', ]}, 
  {value: 'fas fa-dollar-sign', category: ['dollar', 'sign', ]}, 
  {value: 'fas fa-dolly', category: ['dolly', ]}, 
  {value: 'fas fa-dolly-flatbed', category: ['dolly', 'flatbed', ]}, 
  {value: 'fas fa-donate', category: ['donate', ]}, 
  {value: 'fas fa-door-closed', category: ['door', 'closed', ]}, 
  {value: 'fas fa-dot-circle', category: ['dot', 'circle', ]}, 
  {value: 'fas fa-dove', category: ['dove', ]}, 
  {value: 'fas fa-drafting-compass', category: ['drafting', 'compass', ]}, 
  {value: 'fas fa-dragon', category: ['dragon', ]}, 
  {value: 'fas fa-draw-polygon', category: ['draw', 'polygon', ]}, 
  {value: 'fas fa-drum', category: ['drum', ]}, 
  {value: 'fas fa-drum-steelpan', category: ['drum', 'steelpan', ]}, 
  {value: 'fas fa-drumstick-bite', category: ['drumstick', 'bite', ]}, 
  {value: 'fas fa-dumbbell', category: ['dumbbell', ]}, 
  {value: 'fas fa-dumpster', category: ['dumpster', ]}, 
  {value: 'fas fa-dumpster-fire', category: ['dumpster', 'fire', ]}, 
  {value: 'fas fa-dungeon', category: ['dungeon', ]}, 
  {value: 'fas fa-egg', category: ['egg', ]}, 
  {value: 'fas fa-equals', category: ['equals', ]}, 
  {value: 'fas fa-ethernet', category: ['ethernet', ]}, 
  {value: 'fas fa-euro-sign', category: ['euro', 'sign', ]}, 
  {value: 'fas fa-exchange-alt', category: ['exchange', 'alt', ]}, 
  {value: 'fas fa-expand-alt', category: ['expand', 'alt', ]}, 
  {value: 'fas fa-expand-arrows-alt', category: ['expand', 'arrows', 'alt', ]}, 
  {value: 'fas fa-external-link-alt', category: ['external', 'link', 'alt', ]}, 
  {value: 'fas fa-external-link-square-alt', category: ['external', 'link', 'square', 'alt', ]}, 
  {value: 'fas fa-eye-dropper', category: ['eye', 'dropper', ]}, 
  {value: 'fas fa-fan', category: ['fan', ]}, 
  {value: 'fas fa-faucet', category: ['faucet', ]}, 
  {value: 'fas fa-feather', category: ['feather', ]}, 
  {value: 'fas fa-feather-alt', category: ['feather', 'alt', ]}, 
  {value: 'fas fa-file-alt', category: ['file', 'alt', ]}, 
  {value: 'fas fa-file-archive', category: ['file', 'archive', ]}, 
  {value: 'fas fa-file-audio', category: ['file', 'audio', ]}, 
  {value: 'fas fa-file-code', category: ['file', 'code', ]}, 
  {value: 'fas fa-file-contract', category: ['file', 'contract', ]}, 
  {value: 'fas fa-file-csv', category: ['file', 'csv', ]}, 
  {value: 'fas fa-file-download', category: ['file', 'download', ]}, 
  {value: 'fas fa-file-excel', category: ['file', 'excel', ]}, 
  {value: 'fas fa-file-export', category: ['file', 'export', ]}, 
  {value: 'fas fa-file-image', category: ['file', 'image', ]}, 
  {value: 'fas fa-file-import', category: ['file', 'import', ]}, 
  {value: 'fas fa-file-invoice', category: ['file', 'invoice', ]}, 
  {value: 'fas fa-file-invoice-dollar', category: ['file', 'invoice', 'dollar', ]}, 
  {value: 'fas fa-file-medical', category: ['file', 'medical', ]}, 
  {value: 'fas fa-file-medical-alt', category: ['file', 'medical', 'alt', ]}, 
  {value: 'fas fa-file-pdf', category: ['file', 'pdf', ]}, 
  {value: 'fas fa-file-powerpoint', category: ['file', 'powerpoint', ]}, 
  {value: 'fas fa-file-prescription', category: ['file', 'prescription', ]}, 
  {value: 'fas fa-file-signature', category: ['file', 'signature', ]}, 
  {value: 'fas fa-file-upload', category: ['file', 'upload', ]}, 
  {value: 'fas fa-file-video', category: ['file', 'video', ]}, 
  {value: 'fas fa-file-word', category: ['file', 'word', ]}, 
  {value: 'fas fa-fill', category: ['fill', ]}, 
  {value: 'fas fa-fill-drip', category: ['fill', 'drip', ]}, 
  {value: 'fas fa-fingerprint', category: ['fingerprint', ]}, 
  {value: 'fas fa-fire-alt', category: ['fire', 'alt', ]}, 
  {value: 'fas fa-first-aid', category: ['first', 'aid', ]}, 
  {value: 'fas fa-fish', category: ['fish', ]}, 
  {value: 'fas fa-fist-raised', category: ['fist', 'raised', ]}, 
  {value: 'fas fa-flag-usa', category: ['flag', 'usa', ]}, 
  {value: 'fas fa-flushed', category: ['flushed', ]}, 
  {value: 'fas fa-folder-minus', category: ['folder', 'minus', ]}, 
  {value: 'fas fa-folder-plus', category: ['folder', 'plus', ]}, 
  {value: 'fas fa-football-ball', category: ['football', 'ball', ]}, 
  {value: 'fas fa-frog', category: ['frog', ]}, 
  {value: 'fas fa-frown', category: ['frown', ]}, 
  {value: 'fas fa-funnel-dollar', category: ['funnel', 'dollar', ]}, 
  {value: 'fas fa-futbol', category: ['futbol', ]}, 
  {value: 'fas fa-gas-pump', category: ['gas', 'pump', ]}, 
  {value: 'fas fa-gem', category: ['gem', ]}, 
  {value: 'fas fa-ghost', category: ['ghost', ]}, 
  {value: 'fas fa-gifts', category: ['gifts', ]}, 
  {value: 'fas fa-glass-cheers', category: ['glass', 'cheers', ]}, 
  {value: 'fas fa-glass-martini', category: ['glass', 'martini', ]}, 
  {value: 'fas fa-glass-martini-alt', category: ['glass', 'martini', 'alt', ]}, 
  {value: 'fas fa-glass-whiskey', category: ['glass', 'whiskey', ]}, 
  {value: 'fas fa-glasses', category: ['glasses', ]}, 
  {value: 'fas fa-globe-africa', category: ['globe', 'africa', ]}, 
  {value: 'fas fa-globe-americas', category: ['globe', 'americas', ]}, 
  {value: 'fas fa-globe-asia', category: ['globe', 'asia', ]}, 
  {value: 'fas fa-globe-europe', category: ['globe', 'europe', ]}, 
  {value: 'fas fa-golf-ball', category: ['golf', 'ball', ]}, 
  {value: 'fas fa-gopuram', category: ['gopuram', ]}, 
  {value: 'fas fa-greater-than', category: ['greater', 'than', ]}, 
  {value: 'fas fa-greater-than-equal', category: ['greater', 'than', 'equal', ]}, 
  {value: 'fas fa-grimace', category: ['grimace', ]}, 
  {value: 'fas fa-grin', category: ['grin', ]}, 
  {value: 'fas fa-grin-alt', category: ['grin', 'alt', ]}, 
  {value: 'fas fa-grin-beam', category: ['grin', 'beam', ]}, 
  {value: 'fas fa-grin-beam-sweat', category: ['grin', 'beam', 'sweat', ]}, 
  {value: 'fas fa-grin-hearts', category: ['grin', 'hearts', ]}, 
  {value: 'fas fa-grin-squint', category: ['grin', 'squint', ]}, 
  {value: 'fas fa-grin-squint-tears', category: ['grin', 'squint', 'tears', ]}, 
  {value: 'fas fa-grin-stars', category: ['grin', 'stars', ]}, 
  {value: 'fas fa-grin-tears', category: ['grin', 'tears', ]}, 
  {value: 'fas fa-grin-tongue', category: ['grin', 'tongue', ]}, 
  {value: 'fas fa-grin-tongue-squint', category: ['grin', 'tongue', 'squint', ]}, 
  {value: 'fas fa-grin-tongue-wink', category: ['grin', 'tongue', 'wink', ]}, 
  {value: 'fas fa-grin-wink', category: ['grin', 'wink', ]}, 
  {value: 'fas fa-grip-horizontal', category: ['grip', 'horizontal', ]}, 
  {value: 'fas fa-grip-lines', category: ['grip', 'lines', ]}, 
  {value: 'fas fa-grip-lines-vertical', category: ['grip', 'lines', 'vertical', ]}, 
  {value: 'fas fa-grip-vertical', category: ['grip', 'vertical', ]}, 
  {value: 'fas fa-guitar', category: ['guitar', ]}, 
  {value: 'fas fa-hamburger', category: ['hamburger', ]}, 
  {value: 'fas fa-hammer', category: ['hammer', ]}, 
  {value: 'fas fa-hamsa', category: ['hamsa', ]}, 
  {value: 'fas fa-hand-holding', category: ['hand', 'holding', ]}, 
  {value: 'fas fa-hand-holding-heart', category: ['hand', 'holding', 'heart', ]}, 
  {value: 'fas fa-hand-holding-medical', category: ['hand', 'holding', 'medical', ]}, 
  {value: 'fas fa-hand-holding-usd', category: ['hand', 'holding', 'usd', ]}, 
  {value: 'fas fa-hand-holding-water', category: ['hand', 'holding', 'water', ]}, 
  {value: 'fas fa-hand-lizard', category: ['hand', 'lizard', ]}, 
  {value: 'fas fa-hand-middle-finger', category: ['hand', 'middle', 'finger', ]}, 
  {value: 'fas fa-hand-paper', category: ['hand', 'paper', ]}, 
  {value: 'fas fa-hand-peace', category: ['hand', 'peace', ]}, 
  {value: 'fas fa-hand-point-down', category: ['hand', 'point', 'down', ]}, 
  {value: 'fas fa-hand-point-left', category: ['hand', 'point', 'left', ]}, 
  {value: 'fas fa-hand-point-right', category: ['hand', 'point', 'right', ]}, 
  {value: 'fas fa-hand-point-up', category: ['hand', 'point', 'up', ]}, 
  {value: 'fas fa-hand-pointer', category: ['hand', 'pointer', ]}, 
  {value: 'fas fa-hand-rock', category: ['hand', 'rock', ]}, 
  {value: 'fas fa-hand-scissors', category: ['hand', 'scissors', ]}, 
  {value: 'fas fa-hand-sparkles', category: ['hand', 'sparkles', ]}, 
  {value: 'fas fa-hand-spock', category: ['hand', 'spock', ]}, 
  {value: 'fas fa-hands', category: ['hands', ]}, 
  {value: 'fas fa-hands-helping', category: ['hands', 'helping', ]}, 
  {value: 'fas fa-hands-wash', category: ['hands', 'wash', ]}, 
  {value: 'fas fa-handshake', category: ['handshake', ]}, 
  {value: 'fas fa-handshake-alt-slash', category: ['handshake', 'alt', 'slash', ]}, 
  {value: 'fas fa-handshake-slash', category: ['handshake', 'slash', ]}, 
  {value: 'fas fa-hanukiah', category: ['hanukiah', ]}, 
  {value: 'fas fa-hard-hat', category: ['hard', 'hat', ]}, 
  {value: 'fas fa-hat-cowboy', category: ['hat', 'cowboy', ]}, 
  {value: 'fas fa-hat-cowboy-side', category: ['hat', 'cowboy', 'side', ]}, 
  {value: 'fas fa-hat-wizard', category: ['hat', 'wizard', ]}, 
  {value: 'fas fa-hdd', category: ['hdd', ]}, 
  {value: 'fas fa-head-side-cough', category: ['head', 'side', 'cough', ]}, 
  {value: 'fas fa-head-side-cough-slash', category: ['head', 'side', 'cough', 'slash', ]}, 
  {value: 'fas fa-head-side-mask', category: ['head', 'side', 'mask', ]}, 
  {value: 'fas fa-head-side-virus', category: ['head', 'side', 'virus', ]}, 
  {value: 'fas fa-heading', category: ['heading', ]}, 
  {value: 'fas fa-headphones-alt', category: ['headphones', 'alt', ]}, 
  {value: 'fas fa-headset', category: ['headset', ]}, 
  {value: 'fas fa-heart-broken', category: ['heart', 'broken', ]}, 
  {value: 'fas fa-helicopter', category: ['helicopter', ]}, 
  {value: 'fas fa-highlighter', category: ['highlighter', ]}, 
  {value: 'fas fa-hiking', category: ['hiking', ]}, 
  {value: 'fas fa-hippo', category: ['hippo', ]}, 
  {value: 'fas fa-hockey-puck', category: ['hockey', 'puck', ]}, 
  {value: 'fas fa-holly-berry', category: ['holly', 'berry', ]}, 
  {value: 'fas fa-horse', category: ['horse', ]}, 
  {value: 'fas fa-horse-head', category: ['horse', 'head', ]}, 
  {value: 'fas fa-hospital', category: ['hospital', ]}, 
  {value: 'fas fa-hospital-alt', category: ['hospital', 'alt', ]}, 
  {value: 'fas fa-hospital-symbol', category: ['hospital', 'symbol', ]}, 
  {value: 'fas fa-hospital-user', category: ['hospital', 'user', ]}, 
  {value: 'fas fa-hot-tub', category: ['hot', 'tub', ]}, 
  {value: 'fas fa-hotdog', category: ['hotdog', ]}, 
  {value: 'fas fa-house-damage', category: ['house', 'damage', ]}, 
  {value: 'fas fa-house-user', category: ['house', 'user', ]}, 
  {value: 'fas fa-hryvnia', category: ['hryvnia', ]}, 
  {value: 'fas fa-ice-cream', category: ['ice', 'cream', ]}, 
  {value: 'fas fa-icicles', category: ['icicles', ]}, 
  {value: 'fas fa-icons', category: ['icons', ]}, 
  {value: 'fas fa-id-card-alt', category: ['id', 'card', 'alt', ]}, 
  {value: 'fas fa-igloo', category: ['igloo', ]}, 
  {value: 'fas fa-images', category: ['images', ]}, 
  {value: 'fas fa-infinity', category: ['infinity', ]}, 
  {value: 'fas fa-jedi', category: ['jedi', ]}, 
  {value: 'fas fa-joint', category: ['joint', ]}, 
  {value: 'fas fa-journal-whills', category: ['journal', 'whills', ]}, 
  {value: 'fas fa-kaaba', category: ['kaaba', ]}, 
  {value: 'fas fa-keyboard', category: ['keyboard', ]}, 
  {value: 'fas fa-khanda', category: ['khanda', ]}, 
  {value: 'fas fa-kiss', category: ['kiss', ]}, 
  {value: 'fas fa-kiss-beam', category: ['kiss', 'beam', ]}, 
  {value: 'fas fa-kiss-wink-heart', category: ['kiss', 'wink', 'heart', ]}, 
  {value: 'fas fa-kiwi-bird', category: ['kiwi', 'bird', ]}, 
  {value: 'fas fa-landmark', category: ['landmark', ]}, 
  {value: 'fas fa-laptop-code', category: ['laptop', 'code', ]}, 
  {value: 'fas fa-laptop-house', category: ['laptop', 'house', ]}, 
  {value: 'fas fa-laptop-medical', category: ['laptop', 'medical', ]}, 
  {value: 'fas fa-laugh', category: ['laugh', ]}, 
  {value: 'fas fa-laugh-beam', category: ['laugh', 'beam', ]}, 
  {value: 'fas fa-laugh-squint', category: ['laugh', 'squint', ]}, 
  {value: 'fas fa-laugh-wink', category: ['laugh', 'wink', ]}, 
  {value: 'fas fa-layer-group', category: ['layer', 'group', ]}, 
  {value: 'fas fa-lemon', category: ['lemon', ]}, 
  {value: 'fas fa-less-than', category: ['less', 'than', ]}, 
  {value: 'fas fa-less-than-equal', category: ['less', 'than', 'equal', ]}, 
  {value: 'fas fa-level-down-alt', category: ['level', 'down', 'alt', ]}, 
  {value: 'fas fa-level-up-alt', category: ['level', 'up', 'alt', ]}, 
  {value: 'fas fa-lightbulb', category: ['lightbulb', ]}, 
  {value: 'fas fa-lira-sign', category: ['lira', 'sign', ]}, 
  {value: 'fas fa-long-arrow-alt-down', category: ['long', 'arrow', 'alt', 'down', ]}, 
  {value: 'fas fa-long-arrow-alt-left', category: ['long', 'arrow', 'alt', 'left', ]}, 
  {value: 'fas fa-long-arrow-alt-right', category: ['long', 'arrow', 'alt', 'right', ]}, 
  {value: 'fas fa-long-arrow-alt-up', category: ['long', 'arrow', 'alt', 'up', ]}, 
  {value: 'fas fa-luggage-cart', category: ['luggage', 'cart', ]}, 
  {value: 'fas fa-lungs', category: ['lungs', ]}, 
  {value: 'fas fa-lungs-virus', category: ['lungs', 'virus', ]}, 
  {value: 'fas fa-mail-bulk', category: ['mail', 'bulk', ]}, 
  {value: 'fas fa-map-marked', category: ['map', 'marked', ]}, 
  {value: 'fas fa-map-marked-alt', category: ['map', 'marked', 'alt', ]}, 
  {value: 'fas fa-map-marker-alt', category: ['map', 'marker', 'alt', ]}, 
  {value: 'fas fa-marker', category: ['marker', ]}, 
  {value: 'fas fa-mask', category: ['mask', ]}, 
  {value: 'fas fa-medal', category: ['medal', ]}, 
  {value: 'fas fa-meh', category: ['meh', ]}, 
  {value: 'fas fa-meh-blank', category: ['meh', 'blank', ]}, 
  {value: 'fas fa-meh-rolling-eyes', category: ['meh', 'rolling', 'eyes', ]}, 
  {value: 'fas fa-memory', category: ['memory', ]}, 
  {value: 'fas fa-menorah', category: ['menorah', ]}, 
  {value: 'fas fa-meteor', category: ['meteor', ]}, 
  {value: 'fas fa-microphone-alt', category: ['microphone', 'alt', ]}, 
  {value: 'fas fa-microphone-alt-slash', category: ['microphone', 'alt', 'slash', ]}, 
  {value: 'fas fa-microscope', category: ['microscope', ]}, 
  {value: 'fas fa-mitten', category: ['mitten', ]}, 
  {value: 'fas fa-mobile-alt', category: ['mobile', 'alt', ]}, 
  {value: 'fas fa-money-bill', category: ['money', 'bill', ]}, 
  {value: 'fas fa-money-bill-alt', category: ['money', 'bill', 'alt', ]}, 
  {value: 'fas fa-money-bill-wave', category: ['money', 'bill', 'wave', ]}, 
  {value: 'fas fa-money-bill-wave-alt', category: ['money', 'bill', 'wave', 'alt', ]}, 
  {value: 'fas fa-money-check', category: ['money', 'check', ]}, 
  {value: 'fas fa-money-check-alt', category: ['money', 'check', 'alt', ]}, 
  {value: 'fas fa-monument', category: ['monument', ]}, 
  {value: 'fas fa-moon', category: ['moon', ]}, 
  {value: 'fas fa-mortar-pestle', category: ['mortar', 'pestle', ]}, 
  {value: 'fas fa-mosque', category: ['mosque', ]}, 
  {value: 'fas fa-mountain', category: ['mountain', ]}, 
  {value: 'fas fa-mouse', category: ['mouse', ]}, 
  {value: 'fas fa-mug-hot', category: ['mug', 'hot', ]}, 
  {value: 'fas fa-network-wired', category: ['network', 'wired', ]}, 
  {value: 'fas fa-newspaper', category: ['newspaper', ]}, 
  {value: 'fas fa-not-equal', category: ['not', 'equal', ]}, 
  {value: 'fas fa-notes-medical', category: ['notes', 'medical', ]}, 
  {value: 'fas fa-pager', category: ['pager', ]}, 
  {value: 'fas fa-paint-roller', category: ['paint', 'roller', ]}, 
  {value: 'fas fa-palette', category: ['palette', ]}, 
  {value: 'fas fa-pallet', category: ['pallet', ]}, 
  {value: 'fas fa-parachute-box', category: ['parachute', 'box', ]}, 
  {value: 'fas fa-parking', category: ['parking', ]}, 
  {value: 'fas fa-passport', category: ['passport', ]}, 
  {value: 'fas fa-pastafarianism', category: ['pastafarianism', ]}, 
  {value: 'fas fa-peace', category: ['peace', ]}, 
  {value: 'fas fa-pen', category: ['pen', ]}, 
  {value: 'fas fa-pen-alt', category: ['pen', 'alt', ]}, 
  {value: 'fas fa-pen-fancy', category: ['pen', 'fancy', ]}, 
  {value: 'fas fa-pen-nib', category: ['pen', 'nib', ]}, 
  {value: 'fas fa-pen-square', category: ['pen', 'square', ]}, 
  {value: 'fas fa-pencil-alt', category: ['pencil', 'alt', ]}, 
  {value: 'fas fa-pencil-ruler', category: ['pencil', 'ruler', ]}, 
  {value: 'fas fa-people-arrows', category: ['people', 'arrows', ]}, 
  {value: 'fas fa-people-carry', category: ['people', 'carry', ]}, 
  {value: 'fas fa-pepper-hot', category: ['pepper', 'hot', ]}, 
  {value: 'fas fa-percentage', category: ['percentage', ]}, 
  {value: 'fas fa-person-booth', category: ['person', 'booth', ]}, 
  {value: 'fas fa-phone-alt', category: ['phone', 'alt', ]}, 
  {value: 'fas fa-phone-slash', category: ['phone', 'slash', ]}, 
  {value: 'fas fa-phone-square-alt', category: ['phone', 'square', 'alt', ]}, 
  {value: 'fas fa-phone-volume', category: ['phone', 'volume', ]}, 
  {value: 'fas fa-photo-video', category: ['photo', 'video', ]}, 
  {value: 'fas fa-piggy-bank', category: ['piggy', 'bank', ]}, 
  {value: 'fas fa-pills', category: ['pills', ]}, 
  {value: 'fas fa-pizza-slice', category: ['pizza', 'slice', ]}, 
  {value: 'fas fa-plane-arrival', category: ['plane', 'arrival', ]}, 
  {value: 'fas fa-plane-departure', category: ['plane', 'departure', ]}, 
  {value: 'fas fa-plane-slash', category: ['plane', 'slash', ]}, 
  {value: 'fas fa-poll', category: ['poll', ]}, 
  {value: 'fas fa-poll-h', category: ['poll', 'h', ]}, 
  {value: 'fas fa-poo', category: ['poo', ]}, 
  {value: 'fas fa-poo-storm', category: ['poo', 'storm', ]}, 
  {value: 'fas fa-poop', category: ['poop', ]}, 
  {value: 'fas fa-portrait', category: ['portrait', ]}, 
  {value: 'fas fa-pound-sign', category: ['pound', 'sign', ]}, 
  {value: 'fas fa-pray', category: ['pray', ]}, 
  {value: 'fas fa-praying-hands', category: ['praying', 'hands', ]}, 
  {value: 'fas fa-prescription', category: ['prescription', ]}, 
  {value: 'fas fa-prescription-bottle', category: ['prescription', 'bottle', ]}, 
  {value: 'fas fa-prescription-bottle-alt', category: ['prescription', 'bottle', 'alt', ]}, 
  {value: 'fas fa-procedures', category: ['procedures', ]}, 
  {value: 'fas fa-project-diagram', category: ['project', 'diagram', ]}, 
  {value: 'fas fa-pump-medical', category: ['pump', 'medical', ]}, 
  {value: 'fas fa-pump-soap', category: ['pump', 'soap', ]}, 
  {value: 'fas fa-quidditch', category: ['quidditch', ]}, 
  {value: 'fas fa-quran', category: ['quran', ]}, 
  {value: 'fas fa-radiation', category: ['radiation', ]}, 
  {value: 'fas fa-radiation-alt', category: ['radiation', 'alt', ]}, 
  {value: 'fas fa-rainbow', category: ['rainbow', ]}, 
  {value: 'fas fa-receipt', category: ['receipt', ]}, 
  {value: 'fas fa-record-vinyl', category: ['record', 'vinyl', ]}, 
  {value: 'fas fa-redo', category: ['redo', ]}, 
  {value: 'fas fa-redo-alt', category: ['redo', 'alt', ]}, 
  {value: 'fas fa-remove-format', category: ['remove', 'format', ]}, 
  {value: 'fas fa-republican', category: ['republican', ]}, 
  {value: 'fas fa-restroom', category: ['restroom', ]}, 
  {value: 'fas fa-ribbon', category: ['ribbon', ]}, 
  {value: 'fas fa-ring', category: ['ring', ]}, 
  {value: 'fas fa-robot', category: ['robot', ]}, 
  {value: 'fas fa-route', category: ['route', ]}, 
  {value: 'fas fa-ruble-sign', category: ['ruble', 'sign', ]}, 
  {value: 'fas fa-ruler', category: ['ruler', ]}, 
  {value: 'fas fa-ruler-combined', category: ['ruler', 'combined', ]}, 
  {value: 'fas fa-ruler-horizontal', category: ['ruler', 'horizontal', ]}, 
  {value: 'fas fa-ruler-vertical', category: ['ruler', 'vertical', ]}, 
  {value: 'fas fa-running', category: ['running', ]}, 
  {value: 'fas fa-rupee-sign', category: ['rupee', 'sign', ]}, 
  {value: 'fas fa-sad-cry', category: ['sad', 'cry', ]}, 
  {value: 'fas fa-sad-tear', category: ['sad', 'tear', ]}, 
  {value: 'fas fa-satellite', category: ['satellite', ]}, 
  {value: 'fas fa-satellite-dish', category: ['satellite', 'dish', ]}, 
  {value: 'fas fa-school', category: ['school', ]}, 
  {value: 'fas fa-screwdriver', category: ['screwdriver', ]}, 
  {value: 'fas fa-scroll', category: ['scroll', ]}, 
  {value: 'fas fa-sd-card', category: ['sd', 'card', ]}, 
  {value: 'fas fa-search-dollar', category: ['search', 'dollar', ]}, 
  {value: 'fas fa-search-location', category: ['search', 'location', ]}, 
  {value: 'fas fa-seedling', category: ['seedling', ]}, 
  {value: 'fas fa-shapes', category: ['shapes', ]}, 
  {value: 'fas fa-shekel-sign', category: ['shekel', 'sign', ]}, 
  {value: 'fas fa-shield-alt', category: ['shield', 'alt', ]}, 
  {value: 'fas fa-shield-virus', category: ['shield', 'virus', ]}, 
  {value: 'fas fa-shipping-fast', category: ['shipping', 'fast', ]}, 
  {value: 'fas fa-shoe-prints', category: ['shoe', 'prints', ]}, 
  {value: 'fas fa-shuttle-van', category: ['shuttle', 'van', ]}, 
  {value: 'fas fa-sign', category: ['sign', ]}, 
  {value: 'fas fa-sign-in-alt', category: ['sign', 'in', 'alt', ]}, 
  {value: 'fas fa-signature', category: ['signature', ]}, 
  {value: 'fas fa-sim-card', category: ['sim', 'card', ]}, 
  {value: 'fas fa-sink', category: ['sink', ]}, 
  {value: 'fas fa-skating', category: ['skating', ]}, 
  {value: 'fas fa-skiing', category: ['skiing', ]}, 
  {value: 'fas fa-skiing-nordic', category: ['skiing', 'nordic', ]}, 
  {value: 'fas fa-skull', category: ['skull', ]}, 
  {value: 'fas fa-skull-crossbones', category: ['skull', 'crossbones', ]}, 
  {value: 'fas fa-slash', category: ['slash', ]}, 
  {value: 'fas fa-sleigh', category: ['sleigh', ]}, 
  {value: 'fas fa-sliders-h', category: ['sliders', 'h', ]}, 
  {value: 'fas fa-smile', category: ['smile', ]}, 
  {value: 'fas fa-smile-beam', category: ['smile', 'beam', ]}, 
  {value: 'fas fa-smile-wink', category: ['smile', 'wink', ]}, 
  {value: 'fas fa-smog', category: ['smog', ]}, 
  {value: 'fas fa-smoking', category: ['smoking', ]}, 
  {value: 'fas fa-smoking-ban', category: ['smoking', 'ban', ]}, 
  {value: 'fas fa-sms', category: ['sms', ]}, 
  {value: 'fas fa-snowboarding', category: ['snowboarding', ]}, 
  {value: 'fas fa-snowflake', category: ['snowflake', ]}, 
  {value: 'fas fa-snowman', category: ['snowman', ]}, 
  {value: 'fas fa-snowplow', category: ['snowplow', ]}, 
  {value: 'fas fa-soap', category: ['soap', ]}, 
  {value: 'fas fa-socks', category: ['socks', ]}, 
  {value: 'fas fa-solar-panel', category: ['solar', 'panel', ]}, 
  {value: 'fas fa-sort-alpha-down', category: ['sort', 'alpha', 'down', ]}, 
  {value: 'fas fa-sort-alpha-down-alt', category: ['sort', 'alpha', 'down', 'alt', ]}, 
  {value: 'fas fa-sort-alpha-up', category: ['sort', 'alpha', 'up', ]}, 
  {value: 'fas fa-sort-alpha-up-alt', category: ['sort', 'alpha', 'up', 'alt', ]}, 
  {value: 'fas fa-sort-amount-down', category: ['sort', 'amount', 'down', ]}, 
  {value: 'fas fa-sort-amount-down-alt', category: ['sort', 'amount', 'down', 'alt', ]}, 
  {value: 'fas fa-sort-amount-up', category: ['sort', 'amount', 'up', ]}, 
  {value: 'fas fa-sort-amount-up-alt', category: ['sort', 'amount', 'up', 'alt', ]}, 
  {value: 'fas fa-sort-numeric-down', category: ['sort', 'numeric', 'down', ]}, 
  {value: 'fas fa-sort-numeric-down-alt', category: ['sort', 'numeric', 'down', 'alt', ]}, 
  {value: 'fas fa-sort-numeric-up', category: ['sort', 'numeric', 'up', ]}, 
  {value: 'fas fa-sort-numeric-up-alt', category: ['sort', 'numeric', 'up', 'alt', ]}, 
  {value: 'fas fa-spa', category: ['spa', ]}, 
  {value: 'fas fa-spell-check', category: ['spell', 'check', ]}, 
  {value: 'fas fa-spider', category: ['spider', ]}, 
  {value: 'fas fa-splotch', category: ['splotch', ]}, 
  {value: 'fas fa-spray-can', category: ['spray', 'can', ]}, 
  {value: 'fas fa-square-full', category: ['square', 'full', ]}, 
  {value: 'fas fa-square-root-alt', category: ['square', 'root', 'alt', ]}, 
  {value: 'fas fa-stamp', category: ['stamp', ]}, 
  {value: 'fas fa-star-and-crescent', category: ['star', 'and', 'crescent', ]}, 
  {value: 'fas fa-star-half-alt', category: ['star', 'half', 'alt', ]}, 
  {value: 'fas fa-stopwatch', category: ['stopwatch', ]}, 
  {value: 'fas fa-stopwatch-20', category: ['stopwatch', '20', ]}, 
  {value: 'fas fa-store', category: ['store', ]}, 
  {value: 'fas fa-store-alt', category: ['store', 'alt', ]}, 
  {value: 'fas fa-store-alt-slash', category: ['store', 'alt', 'slash', ]}, 
  {value: 'fas fa-store-slash', category: ['store', 'slash', ]}, 
  {value: 'fas fa-stream', category: ['stream', ]}, 
  {value: 'fas fa-stroopwafel', category: ['stroopwafel', ]}, 
  {value: 'fas fa-suitcase-rolling', category: ['suitcase', 'rolling', ]}, 
  {value: 'fas fa-sun', category: ['sun', ]}, 
  {value: 'fas fa-surprise', category: ['surprise', ]}, 
  {value: 'fas fa-swatchbook', category: ['swatchbook', ]}, 
  {value: 'fas fa-swimmer', category: ['swimmer', ]}, 
  {value: 'fas fa-swimming-pool', category: ['swimming', 'pool', ]}, 
  {value: 'fas fa-synagogue', category: ['synagogue', ]}, 
  {value: 'fas fa-sync', category: ['sync', ]}, 
  {value: 'fas fa-sync-alt', category: ['sync', 'alt', ]}, 
  {value: 'fas fa-syringe', category: ['syringe', ]}, 
  {value: 'fas fa-table-tennis', category: ['table', 'tennis', ]}, 
  {value: 'fas fa-tablet-alt', category: ['tablet', 'alt', ]}, 
  {value: 'fas fa-tablets', category: ['tablets', ]}, 
  {value: 'fas fa-tachometer-alt', category: ['tachometer', 'alt', ]}, 
  {value: 'fas fa-tape', category: ['tape', ]}, 
  {value: 'fas fa-teeth', category: ['teeth', ]}, 
  {value: 'fas fa-temperature-high', category: ['temperature', 'high', ]}, 
  {value: 'fas fa-temperature-low', category: ['temperature', 'low', ]}, 
  {value: 'fas fa-tenge', category: ['tenge', ]}, 
  {value: 'fas fa-theater-masks', category: ['theater', 'masks', ]}, 
  {value: 'fas fa-thumbtack', category: ['thumbtack', ]}, 
  {value: 'fas fa-ticket-alt', category: ['ticket', 'alt', ]}, 
  {value: 'fas fa-tint-slash', category: ['tint', 'slash', ]}, 
  {value: 'fas fa-tired', category: ['tired', ]}, 
  {value: 'fas fa-toilet', category: ['toilet', ]}, 
  {value: 'fas fa-toilet-paper', category: ['toilet', 'paper', ]}, 
  {value: 'fas fa-toilet-paper-slash', category: ['toilet', 'paper', 'slash', ]}, 
  {value: 'fas fa-toolbox', category: ['toolbox', ]}, 
  {value: 'fas fa-tools', category: ['tools', ]}, 
  {value: 'fas fa-tooth', category: ['tooth', ]}, 
  {value: 'fas fa-torah', category: ['torah', ]}, 
  {value: 'fas fa-torii-gate', category: ['torii', 'gate', ]}, 
  {value: 'fas fa-tractor', category: ['tractor', ]}, 
  {value: 'fas fa-traffic-light', category: ['traffic', 'light', ]}, 
  {value: 'fas fa-trailer', category: ['trailer', ]}, 
  {value: 'fas fa-tram', category: ['tram', ]}, 
  {value: 'fas fa-trash-alt', category: ['trash', 'alt', ]}, 
  {value: 'fas fa-trash-restore', category: ['trash', 'restore', ]}, 
  {value: 'fas fa-trash-restore-alt', category: ['trash', 'restore', 'alt', ]}, 
  {value: 'fas fa-truck-loading', category: ['truck', 'loading', ]}, 
  {value: 'fas fa-truck-monster', category: ['truck', 'monster', ]}, 
  {value: 'fas fa-truck-moving', category: ['truck', 'moving', ]}, 
  {value: 'fas fa-truck-pickup', category: ['truck', 'pickup', ]}, 
  {value: 'fas fa-tshirt', category: ['tshirt', ]}, 
  {value: 'fas fa-umbrella-beach', category: ['umbrella', 'beach', ]}, 
  {value: 'fas fa-undo-alt', category: ['undo', 'alt', ]}, 
  {value: 'fas fa-user-alt', category: ['user', 'alt', ]}, 
  {value: 'fas fa-user-alt-slash', category: ['user', 'alt', 'slash', ]}, 
  {value: 'fas fa-user-astronaut', category: ['user', 'astronaut', ]}, 
  {value: 'fas fa-user-check', category: ['user', 'check', ]}, 
  {value: 'fas fa-user-clock', category: ['user', 'clock', ]}, 
  {value: 'fas fa-user-cog', category: ['user', 'cog', ]}, 
  {value: 'fas fa-user-edit', category: ['user', 'edit', ]}, 
  {value: 'fas fa-user-friends', category: ['user', 'friends', ]}, 
  {value: 'fas fa-user-graduate', category: ['user', 'graduate', ]}, 
  {value: 'fas fa-user-injured', category: ['user', 'injured', ]}, 
  {value: 'fas fa-user-lock', category: ['user', 'lock', ]}, 
  {value: 'fas fa-user-minus', category: ['user', 'minus', ]}, 
  {value: 'fas fa-user-ninja', category: ['user', 'ninja', ]}, 
  {value: 'fas fa-user-nurse', category: ['user', 'nurse', ]}, 
  {value: 'fas fa-user-shield', category: ['user', 'shield', ]}, 
  {value: 'fas fa-user-slash', category: ['user', 'slash', ]}, 
  {value: 'fas fa-user-tag', category: ['user', 'tag', ]}, 
  {value: 'fas fa-user-tie', category: ['user', 'tie', ]}, 
  {value: 'fas fa-users-cog', category: ['users', 'cog', ]}, 
  {value: 'fas fa-users-slash', category: ['users', 'slash', ]}, 
  {value: 'fas fa-utensil-spoon', category: ['utensil', 'spoon', ]}, 
  {value: 'fas fa-utensils', category: ['utensils', ]}, 
  {value: 'fas fa-vector-square', category: ['vector', 'square', ]}, 
  {value: 'fas fa-vest', category: ['vest', ]}, 
  {value: 'fas fa-vest-patches', category: ['vest', 'patches', ]}, 
  {value: 'fas fa-vial', category: ['vial', ]}, 
  {value: 'fas fa-vials', category: ['vials', ]}, 
  {value: 'fas fa-video', category: ['video', ]}, 
  {value: 'fas fa-video-slash', category: ['video', 'slash', ]}, 
  {value: 'fas fa-vihara', category: ['vihara', ]}, 
  {value: 'fas fa-virus', category: ['virus', ]}, 
  {value: 'fas fa-virus-slash', category: ['virus', 'slash', ]}, 
  {value: 'fas fa-viruses', category: ['viruses', ]}, 
  {value: 'fas fa-voicemail', category: ['voicemail', ]}, 
  {value: 'fas fa-volleyball-ball', category: ['volleyball', 'ball', ]}, 
  {value: 'fas fa-volume-mute', category: ['volume', 'mute', ]}, 
  {value: 'fas fa-vote-yea', category: ['vote', 'yea', ]}, 
  {value: 'fas fa-vr-cardboard', category: ['vr', 'cardboard', ]}, 
  {value: 'fas fa-walking', category: ['walking', ]}, 
  {value: 'fas fa-wallet', category: ['wallet', ]}, 
  {value: 'fas fa-warehouse', category: ['warehouse', ]}, 
  {value: 'fas fa-water', category: ['water', ]}, 
  {value: 'fas fa-wave-square', category: ['wave', 'square', ]}, 
  {value: 'fas fa-weight', category: ['weight', ]}, 
  {value: 'fas fa-weight-hanging', category: ['weight', 'hanging', ]}, 
  {value: 'fas fa-wind', category: ['wind', ]}, 
  {value: 'fas fa-wine-bottle', category: ['wine', 'bottle', ]}, 
  {value: 'fas fa-wine-glass', category: ['wine', 'glass', ]}, 
  {value: 'fas fa-wine-glass-alt', category: ['wine', 'glass', 'alt', ]}, 
  {value: 'fas fa-won-sign', category: ['won', 'sign', ]}, 
  {value: 'fas fa-x-ray', category: ['x', 'ray', ]}, 
  {value: 'fas fa-yen-sign', category: ['yen', 'sign', ]}, 
  {value: 'fa-solid fa-1', category: ['solid', '1', ]}, 
  {value: 'fa-solid fa-2', category: ['solid', '2', ]}, 
  {value: 'fa-solid fa-3', category: ['solid', '3', ]}, 
  {value: 'fa-solid fa-4', category: ['solid', '4', ]}, 
  {value: 'fa-solid fa-5', category: ['solid', '5', ]}, 
  {value: 'fa-solid fa-6', category: ['solid', '6', ]}, 
  {value: 'fa-solid fa-7', category: ['solid', '7', ]}, 
  {value: 'fa-solid fa-8', category: ['solid', '8', ]}, 
  {value: 'fa-solid fa-9', category: ['solid', '9', ]}, 
  {value: 'fa-solid fa-a', category: ['solid', 'a', ]}, 
  {value: 'fa-solid fa-angles-down', category: ['solid', 'angles', 'down', ]}, 
  {value: 'fa-solid fa-angles-left', category: ['solid', 'angles', 'left', ]}, 
  {value: 'fa-solid fa-angles-right', category: ['solid', 'angles', 'right', ]}, 
  {value: 'fa-solid fa-angles-up', category: ['solid', 'angles', 'up', ]}, 
  {value: 'fa-solid fa-apple-whole', category: ['solid', 'apple', 'whole', ]}, 
  {value: 'fa-solid fa-arrow-down-1-9', category: ['solid', 'arrow', 'down', '1', '9', ]}, 
  {value: 'fa-solid fa-arrow-down-9-1', category: ['solid', 'arrow', 'down', '9', '1', ]}, 
  {value: 'fa-solid fa-arrow-down-a-z', category: ['solid', 'arrow', 'down', 'a', 'z', ]}, 
  {value: 'fa-solid fa-arrow-down-long', category: ['solid', 'arrow', 'down', 'long', ]}, 
  {value: 'fa-solid fa-arrow-down-short-wide', category: ['solid', 'arrow', 'down', 'short', 'wide', ]}, 
  {value: 'fa-solid fa-arrow-down-wide-short', category: ['solid', 'arrow', 'down', 'wide', 'short', ]}, 
  {value: 'fa-solid fa-arrow-down-z-a', category: ['solid', 'arrow', 'down', 'z', 'a', ]}, 
  {value: 'fa-solid fa-arrow-left-long', category: ['solid', 'arrow', 'left', 'long', ]}, 
  {value: 'fa-solid fa-arrow-pointer', category: ['solid', 'arrow', 'pointer', ]}, 
  {value: 'fa-solid fa-arrow-right-arrow-left', category: ['solid', 'arrow', 'right', 'arrow', 'left', ]}, 
  {value: 'fa-solid fa-arrow-right-from-bracket', category: ['solid', 'arrow', 'right', 'from', 'bracket', ]}, 
  {value: 'fa-solid fa-arrow-right-long', category: ['solid', 'arrow', 'right', 'long', ]}, 
  {value: 'fa-solid fa-arrow-right-to-bracket', category: ['solid', 'arrow', 'right', 'to', 'bracket', ]}, 
  {value: 'fa-solid fa-arrow-rotate-left', category: ['solid', 'arrow', 'rotate', 'left', ]}, 
  {value: 'fa-solid fa-arrow-rotate-right', category: ['solid', 'arrow', 'rotate', 'right', ]}, 
  {value: 'fa-solid fa-arrow-trend-down', category: ['solid', 'arrow', 'trend', 'down', ]}, 
  {value: 'fa-solid fa-arrow-trend-up', category: ['solid', 'arrow', 'trend', 'up', ]}, 
  {value: 'fa-solid fa-arrow-turn-down', category: ['solid', 'arrow', 'turn', 'down', ]}, 
  {value: 'fa-solid fa-arrow-turn-up', category: ['solid', 'arrow', 'turn', 'up', ]}, 
  {value: 'fa-solid fa-arrow-up-1-9', category: ['solid', 'arrow', 'up', '1', '9', ]}, 
  {value: 'fa-solid fa-arrow-up-9-1', category: ['solid', 'arrow', 'up', '9', '1', ]}, 
  {value: 'fa-solid fa-arrow-up-a-z', category: ['solid', 'arrow', 'up', 'a', 'z', ]}, 
  {value: 'fa-solid fa-arrow-up-from-bracket', category: ['solid', 'arrow', 'up', 'from', 'bracket', ]}, 
  {value: 'fa-solid fa-arrow-up-long', category: ['solid', 'arrow', 'up', 'long', ]}, 
  {value: 'fa-solid fa-arrow-up-right-from-square', category: ['solid', 'arrow', 'up', 'right', 'from', 'square', ]}, 
  {value: 'fa-solid fa-arrow-up-short-wide', category: ['solid', 'arrow', 'up', 'short', 'wide', ]}, 
  {value: 'fa-solid fa-arrow-up-wide-short', category: ['solid', 'arrow', 'up', 'wide', 'short', ]}, 
  {value: 'fa-solid fa-arrow-up-z-a', category: ['solid', 'arrow', 'up', 'z', 'a', ]}, 
  {value: 'fa-solid fa-arrows-left-right', category: ['solid', 'arrows', 'left', 'right', ]}, 
  {value: 'fa-solid fa-arrows-rotate', category: ['solid', 'arrows', 'rotate', ]}, 
  {value: 'fa-solid fa-arrows-up-down', category: ['solid', 'arrows', 'up', 'down', ]}, 
  {value: 'fa-solid fa-arrows-up-down-left-right', category: ['solid', 'arrows', 'up', 'down', 'left', 'right', ]}, 
  {value: 'fa-solid fa-austral-sign', category: ['solid', 'austral', 'sign', ]}, 
  {value: 'fa-solid fa-b', category: ['solid', 'b', ]}, 
  {value: 'fa-solid fa-backward-fast', category: ['solid', 'backward', 'fast', ]}, 
  {value: 'fa-solid fa-backward-step', category: ['solid', 'backward', 'step', ]}, 
  {value: 'fa-solid fa-bag-shopping', category: ['solid', 'bag', 'shopping', ]}, 
  {value: 'fa-solid fa-baht-sign', category: ['solid', 'baht', 'sign', ]}, 
  {value: 'fa-solid fa-ban-smoking', category: ['solid', 'ban', 'smoking', ]}, 
  {value: 'fa-solid fa-bandage', category: ['solid', 'bandage', ]}, 
  {value: 'fa-solid fa-bars-progress', category: ['solid', 'bars', 'progress', ]}, 
  {value: 'fa-solid fa-bars-staggered', category: ['solid', 'bars', 'staggered', ]}, 
  {value: 'fa-solid fa-baseball', category: ['solid', 'baseball', ]}, 
  {value: 'fa-solid fa-baseball-bat-ball', category: ['solid', 'baseball', 'bat', 'ball', ]}, 
  {value: 'fa-solid fa-basket-shopping', category: ['solid', 'basket', 'shopping', ]}, 
  {value: 'fa-solid fa-basketball', category: ['solid', 'basketball', ]}, 
  {value: 'fa-solid fa-bed-pulse', category: ['solid', 'bed', 'pulse', ]}, 
  {value: 'fa-solid fa-beer-mug-empty', category: ['solid', 'beer', 'mug', 'empty', ]}, 
  {value: 'fa-solid fa-bell-concierge', category: ['solid', 'bell', 'concierge', ]}, 
  {value: 'fa-solid fa-bitcoin-sign', category: ['solid', 'bitcoin', 'sign', ]}, 
  {value: 'fa-solid fa-bolt-lightning', category: ['solid', 'bolt', 'lightning', ]}, 
  {value: 'fa-solid fa-book-atlas', category: ['solid', 'book', 'atlas', ]}, 
  {value: 'fa-solid fa-book-bible', category: ['solid', 'book', 'bible', ]}, 
  {value: 'fa-solid fa-book-journal-whills', category: ['solid', 'book', 'journal', 'whills', ]}, 
  {value: 'fa-solid fa-book-quran', category: ['solid', 'book', 'quran', ]}, 
  {value: 'fa-solid fa-book-skull', category: ['solid', 'book', 'skull', ]}, 
  {value: 'fa-solid fa-border-top-left', category: ['solid', 'border', 'top', 'left', ]}, 
  {value: 'fa-solid fa-box-archive', category: ['solid', 'box', 'archive', ]}, 
  {value: 'fa-solid fa-boxes-stacked', category: ['solid', 'boxes', 'stacked', ]}, 
  {value: 'fa-solid fa-brazilian-real-sign', category: ['solid', 'brazilian', 'real', 'sign', ]}, 
  {value: 'fa-solid fa-broom-ball', category: ['solid', 'broom', 'ball', ]}, 
  {value: 'fa-solid fa-bug-slash', category: ['solid', 'bug', 'slash', ]}, 
  {value: 'fa-solid fa-building-columns', category: ['solid', 'building', 'columns', ]}, 
  {value: 'fa-solid fa-burger', category: ['solid', 'burger', ]}, 
  {value: 'fa-solid fa-bus-simple', category: ['solid', 'bus', 'simple', ]}, 
  {value: 'fa-solid fa-c', category: ['solid', 'c', ]}, 
  {value: 'fa-solid fa-cake-candles', category: ['solid', 'cake', 'candles', ]}, 
  {value: 'fa-solid fa-calendar-days', category: ['solid', 'calendar', 'days', ]}, 
  {value: 'fa-solid fa-calendar-xmark', category: ['solid', 'calendar', 'xmark', ]}, 
  {value: 'fa-solid fa-camera-rotate', category: ['solid', 'camera', 'rotate', ]}, 
  {value: 'fa-solid fa-car-rear', category: ['solid', 'car', 'rear', ]}, 
  {value: 'fa-solid fa-cart-flatbed', category: ['solid', 'cart', 'flatbed', ]}, 
  {value: 'fa-solid fa-cart-flatbed-suitcase', category: ['solid', 'cart', 'flatbed', 'suitcase', ]}, 
  {value: 'fa-solid fa-cart-shopping', category: ['solid', 'cart', 'shopping', ]}, 
  {value: 'fa-solid fa-cedi-sign', category: ['solid', 'cedi', 'sign', ]}, 
  {value: 'fa-solid fa-cent-sign', category: ['solid', 'cent', 'sign', ]}, 
  {value: 'fa-solid fa-chalkboard-user', category: ['solid', 'chalkboard', 'user', ]}, 
  {value: 'fa-solid fa-champagne-glasses', category: ['solid', 'champagne', 'glasses', ]}, 
  {value: 'fa-solid fa-chart-column', category: ['solid', 'chart', 'column', ]}, 
  {value: 'fa-solid fa-chart-gantt', category: ['solid', 'chart', 'gantt', ]}, 
  {value: 'fa-solid fa-check-to-slot', category: ['solid', 'check', 'to', 'slot', ]}, 
  {value: 'fa-solid fa-circle-arrow-down', category: ['solid', 'circle', 'arrow', 'down', ]}, 
  {value: 'fa-solid fa-circle-arrow-left', category: ['solid', 'circle', 'arrow', 'left', ]}, 
  {value: 'fa-solid fa-circle-arrow-right', category: ['solid', 'circle', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-circle-arrow-up', category: ['solid', 'circle', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-circle-check', category: ['solid', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-circle-chevron-down', category: ['solid', 'circle', 'chevron', 'down', ]}, 
  {value: 'fa-solid fa-circle-chevron-left', category: ['solid', 'circle', 'chevron', 'left', ]}, 
  {value: 'fa-solid fa-circle-chevron-right', category: ['solid', 'circle', 'chevron', 'right', ]}, 
  {value: 'fa-solid fa-circle-chevron-up', category: ['solid', 'circle', 'chevron', 'up', ]}, 
  {value: 'fa-solid fa-circle-dollar-to-slot', category: ['solid', 'circle', 'dollar', 'to', 'slot', ]}, 
  {value: 'fa-solid fa-circle-dot', category: ['solid', 'circle', 'dot', ]}, 
  {value: 'fa-solid fa-circle-down', category: ['solid', 'circle', 'down', ]}, 
  {value: 'fa-solid fa-circle-exclamation', category: ['solid', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-circle-h', category: ['solid', 'circle', 'h', ]}, 
  {value: 'fa-solid fa-circle-half-stroke', category: ['solid', 'circle', 'half', 'stroke', ]}, 
  {value: 'fa-solid fa-circle-info', category: ['solid', 'circle', 'info', ]}, 
  {value: 'fa-solid fa-circle-left', category: ['solid', 'circle', 'left', ]}, 
  {value: 'fa-solid fa-circle-minus', category: ['solid', 'circle', 'minus', ]}, 
  {value: 'fa-solid fa-circle-pause', category: ['solid', 'circle', 'pause', ]}, 
  {value: 'fa-solid fa-circle-play', category: ['solid', 'circle', 'play', ]}, 
  {value: 'fa-solid fa-circle-plus', category: ['solid', 'circle', 'plus', ]}, 
  {value: 'fa-solid fa-circle-question', category: ['solid', 'circle', 'question', ]}, 
  {value: 'fa-solid fa-circle-radiation', category: ['solid', 'circle', 'radiation', ]}, 
  {value: 'fa-solid fa-circle-right', category: ['solid', 'circle', 'right', ]}, 
  {value: 'fa-solid fa-circle-stop', category: ['solid', 'circle', 'stop', ]}, 
  {value: 'fa-solid fa-circle-up', category: ['solid', 'circle', 'up', ]}, 
  {value: 'fa-solid fa-circle-user', category: ['solid', 'circle', 'user', ]}, 
  {value: 'fa-solid fa-circle-xmark', category: ['solid', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-clapperboard', category: ['solid', 'clapperboard', ]}, 
  {value: 'fa-solid fa-clock-rotate-left', category: ['solid', 'clock', 'rotate', 'left', ]}, 
  {value: 'fa-solid fa-cloud-arrow-down', category: ['solid', 'cloud', 'arrow', 'down', ]}, 
  {value: 'fa-solid fa-cloud-arrow-up', category: ['solid', 'cloud', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-clover', category: ['solid', 'clover', ]}, 
  {value: 'fa-solid fa-code-commit', category: ['solid', 'code', 'commit', ]}, 
  {value: 'fa-solid fa-code-compare', category: ['solid', 'code', 'compare', ]}, 
  {value: 'fa-solid fa-code-merge', category: ['solid', 'code', 'merge', ]}, 
  {value: 'fa-solid fa-code-pull-request', category: ['solid', 'code', 'pull', 'request', ]}, 
  {value: 'fa-solid fa-colon-sign', category: ['solid', 'colon', 'sign', ]}, 
  {value: 'fa-solid fa-comment-sms', category: ['solid', 'comment', 'sms', ]}, 
  {value: 'fa-solid fa-compass-drafting', category: ['solid', 'compass', 'drafting', ]}, 
  {value: 'fa-solid fa-computer-mouse', category: ['solid', 'computer', 'mouse', ]}, 
  {value: 'fa-solid fa-crop-simple', category: ['solid', 'crop', 'simple', ]}, 
  {value: 'fa-solid fa-cruzeiro-sign', category: ['solid', 'cruzeiro', 'sign', ]}, 
  {value: 'fa-solid fa-d', category: ['solid', 'd', ]}, 
  {value: 'fa-solid fa-delete-left', category: ['solid', 'delete', 'left', ]}, 
  {value: 'fa-solid fa-diagram-next', category: ['solid', 'diagram', 'next', ]}, 
  {value: 'fa-solid fa-diagram-predecessor', category: ['solid', 'diagram', 'predecessor', ]}, 
  {value: 'fa-solid fa-diagram-project', category: ['solid', 'diagram', 'project', ]}, 
  {value: 'fa-solid fa-diagram-successor', category: ['solid', 'diagram', 'successor', ]}, 
  {value: 'fa-solid fa-diamond-turn-right', category: ['solid', 'diamond', 'turn', 'right', ]}, 
  {value: 'fa-solid fa-dong-sign', category: ['solid', 'dong', 'sign', ]}, 
  {value: 'fa-solid fa-down-left-and-up-right-to-center', category: ['solid', 'down', 'left', 'and', 'up', 'right', 'to', 'center', ]}, 
  {value: 'fa-solid fa-down-long', category: ['solid', 'down', 'long', ]}, 
  {value: 'fa-solid fa-droplet', category: ['solid', 'droplet', ]}, 
  {value: 'fa-solid fa-droplet-slash', category: ['solid', 'droplet', 'slash', ]}, 
  {value: 'fa-solid fa-e', category: ['solid', 'e', ]}, 
  {value: 'fa-solid fa-ear-deaf', category: ['solid', 'ear', 'deaf', ]}, 
  {value: 'fa-solid fa-ear-listen', category: ['solid', 'ear', 'listen', ]}, 
  {value: 'fa-solid fa-earth-africa', category: ['solid', 'earth', 'africa', ]}, 
  {value: 'fa-solid fa-earth-americas', category: ['solid', 'earth', 'americas', ]}, 
  {value: 'fa-solid fa-earth-asia', category: ['solid', 'earth', 'asia', ]}, 
  {value: 'fa-solid fa-earth-europe', category: ['solid', 'earth', 'europe', ]}, 
  {value: 'fa-solid fa-elevator', category: ['solid', 'elevator', ]}, 
  {value: 'fa-solid fa-ellipsis', category: ['solid', 'ellipsis', ]}, 
  {value: 'fa-solid fa-ellipsis-vertical', category: ['solid', 'ellipsis', 'vertical', ]}, 
  {value: 'fa-solid fa-envelopes-bulk', category: ['solid', 'envelopes', 'bulk', ]}, 
  {value: 'fa-solid fa-eye-low-vision', category: ['solid', 'eye', 'low', 'vision', ]}, 
  {value: 'fa-solid fa-f', category: ['solid', 'f', ]}, 
  {value: 'fa-solid fa-face-angry', category: ['solid', 'face', 'angry', ]}, 
  {value: 'fa-solid fa-face-dizzy', category: ['solid', 'face', 'dizzy', ]}, 
  {value: 'fa-solid fa-face-flushed', category: ['solid', 'face', 'flushed', ]}, 
  {value: 'fa-solid fa-face-frown', category: ['solid', 'face', 'frown', ]}, 
  {value: 'fa-solid fa-face-grimace', category: ['solid', 'face', 'grimace', ]}, 
  {value: 'fa-solid fa-face-grin', category: ['solid', 'face', 'grin', ]}, 
  {value: 'fa-solid fa-face-grin-beam', category: ['solid', 'face', 'grin', 'beam', ]}, 
  {value: 'fa-solid fa-face-grin-beam-sweat', category: ['solid', 'face', 'grin', 'beam', 'sweat', ]}, 
  {value: 'fa-solid fa-face-grin-hearts', category: ['solid', 'face', 'grin', 'hearts', ]}, 
  {value: 'fa-solid fa-face-grin-squint', category: ['solid', 'face', 'grin', 'squint', ]}, 
  {value: 'fa-solid fa-face-grin-squint-tears', category: ['solid', 'face', 'grin', 'squint', 'tears', ]}, 
  {value: 'fa-solid fa-face-grin-stars', category: ['solid', 'face', 'grin', 'stars', ]}, 
  {value: 'fa-solid fa-face-grin-tears', category: ['solid', 'face', 'grin', 'tears', ]}, 
  {value: 'fa-solid fa-face-grin-tongue', category: ['solid', 'face', 'grin', 'tongue', ]}, 
  {value: 'fa-solid fa-face-grin-tongue-squint', category: ['solid', 'face', 'grin', 'tongue', 'squint', ]}, 
  {value: 'fa-solid fa-face-grin-tongue-wink', category: ['solid', 'face', 'grin', 'tongue', 'wink', ]}, 
  {value: 'fa-solid fa-face-grin-wide', category: ['solid', 'face', 'grin', 'wide', ]}, 
  {value: 'fa-solid fa-face-grin-wink', category: ['solid', 'face', 'grin', 'wink', ]}, 
  {value: 'fa-solid fa-face-kiss', category: ['solid', 'face', 'kiss', ]}, 
  {value: 'fa-solid fa-face-kiss-beam', category: ['solid', 'face', 'kiss', 'beam', ]}, 
  {value: 'fa-solid fa-face-kiss-wink-heart', category: ['solid', 'face', 'kiss', 'wink', 'heart', ]}, 
  {value: 'fa-solid fa-face-laugh', category: ['solid', 'face', 'laugh', ]}, 
  {value: 'fa-solid fa-face-laugh-beam', category: ['solid', 'face', 'laugh', 'beam', ]}, 
  {value: 'fa-solid fa-face-laugh-squint', category: ['solid', 'face', 'laugh', 'squint', ]}, 
  {value: 'fa-solid fa-face-laugh-wink', category: ['solid', 'face', 'laugh', 'wink', ]}, 
  {value: 'fa-solid fa-face-meh', category: ['solid', 'face', 'meh', ]}, 
  {value: 'fa-solid fa-face-meh-blank', category: ['solid', 'face', 'meh', 'blank', ]}, 
  {value: 'fa-solid fa-face-rolling-eyes', category: ['solid', 'face', 'rolling', 'eyes', ]}, 
  {value: 'fa-solid fa-face-sad-cry', category: ['solid', 'face', 'sad', 'cry', ]}, 
  {value: 'fa-solid fa-face-sad-tear', category: ['solid', 'face', 'sad', 'tear', ]}, 
  {value: 'fa-solid fa-face-smile', category: ['solid', 'face', 'smile', ]}, 
  {value: 'fa-solid fa-face-smile-beam', category: ['solid', 'face', 'smile', 'beam', ]}, 
  {value: 'fa-solid fa-face-smile-wink', category: ['solid', 'face', 'smile', 'wink', ]}, 
  {value: 'fa-solid fa-face-surprise', category: ['solid', 'face', 'surprise', ]}, 
  {value: 'fa-solid fa-face-tired', category: ['solid', 'face', 'tired', ]}, 
  {value: 'fa-solid fa-feather-pointed', category: ['solid', 'feather', 'pointed', ]}, 
  {value: 'fa-solid fa-file-arrow-down', category: ['solid', 'file', 'arrow', 'down', ]}, 
  {value: 'fa-solid fa-file-arrow-up', category: ['solid', 'file', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-file-lines', category: ['solid', 'file', 'lines', ]}, 
  {value: 'fa-solid fa-file-waveform', category: ['solid', 'file', 'waveform', ]}, 
  {value: 'fa-solid fa-file-zipper', category: ['solid', 'file', 'zipper', ]}, 
  {value: 'fa-solid fa-filter-circle-dollar', category: ['solid', 'filter', 'circle', 'dollar', ]}, 
  {value: 'fa-solid fa-filter-circle-xmark', category: ['solid', 'filter', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-fire-flame-curved', category: ['solid', 'fire', 'flame', 'curved', ]}, 
  {value: 'fa-solid fa-fire-flame-simple', category: ['solid', 'fire', 'flame', 'simple', ]}, 
  {value: 'fa-solid fa-floppy-disk', category: ['solid', 'floppy', 'disk', ]}, 
  {value: 'fa-solid fa-florin-sign', category: ['solid', 'florin', 'sign', ]}, 
  {value: 'fa-solid fa-folder-tree', category: ['solid', 'folder', 'tree', ]}, 
  {value: 'fa-solid fa-football', category: ['solid', 'football', ]}, 
  {value: 'fa-solid fa-forward-fast', category: ['solid', 'forward', 'fast', ]}, 
  {value: 'fa-solid fa-forward-step', category: ['solid', 'forward', 'step', ]}, 
  {value: 'fa-solid fa-franc-sign', category: ['solid', 'franc', 'sign', ]}, 
  {value: 'fa-solid fa-g', category: ['solid', 'g', ]}, 
  {value: 'fa-solid fa-gauge', category: ['solid', 'gauge', ]}, 
  {value: 'fa-solid fa-gauge-high', category: ['solid', 'gauge', 'high', ]}, 
  {value: 'fa-solid fa-gauge-simple', category: ['solid', 'gauge', 'simple', ]}, 
  {value: 'fa-solid fa-gauge-simple-high', category: ['solid', 'gauge', 'simple', 'high', ]}, 
  {value: 'fa-solid fa-golf-ball-tee', category: ['solid', 'golf', 'ball', 'tee', ]}, 
  {value: 'fa-solid fa-grip', category: ['solid', 'grip', ]}, 
  {value: 'fa-solid fa-guarani-sign', category: ['solid', 'guarani', 'sign', ]}, 
  {value: 'fa-solid fa-gun', category: ['solid', 'gun', ]}, 
  {value: 'fa-solid fa-h', category: ['solid', 'h', ]}, 
  {value: 'fa-solid fa-hand', category: ['solid', 'hand', ]}, 
  {value: 'fa-solid fa-hand-back-fist', category: ['solid', 'hand', 'back', 'fist', ]}, 
  {value: 'fa-solid fa-hand-dots', category: ['solid', 'hand', 'dots', ]}, 
  {value: 'fa-solid fa-hand-fist', category: ['solid', 'hand', 'fist', ]}, 
  {value: 'fa-solid fa-hand-holding-dollar', category: ['solid', 'hand', 'holding', 'dollar', ]}, 
  {value: 'fa-solid fa-hand-holding-droplet', category: ['solid', 'hand', 'holding', 'droplet', ]}, 
  {value: 'fa-solid fa-hands-asl-interpreting', category: ['solid', 'hands', 'asl', 'interpreting', ]}, 
  {value: 'fa-solid fa-hands-bubbles', category: ['solid', 'hands', 'bubbles', ]}, 
  {value: 'fa-solid fa-hands-clapping', category: ['solid', 'hands', 'clapping', ]}, 
  {value: 'fa-solid fa-hands-holding', category: ['solid', 'hands', 'holding', ]}, 
  {value: 'fa-solid fa-hands-praying', category: ['solid', 'hands', 'praying', ]}, 
  {value: 'fa-solid fa-handshake-angle', category: ['solid', 'handshake', 'angle', ]}, 
  {value: 'fa-solid fa-handshake-simple-slash', category: ['solid', 'handshake', 'simple', 'slash', ]}, 
  {value: 'fa-solid fa-hard-drive', category: ['solid', 'hard', 'drive', ]}, 
  {value: 'fa-solid fa-headphones-simple', category: ['solid', 'headphones', 'simple', ]}, 
  {value: 'fa-solid fa-heart-crack', category: ['solid', 'heart', 'crack', ]}, 
  {value: 'fa-solid fa-heart-pulse', category: ['solid', 'heart', 'pulse', ]}, 
  {value: 'fa-solid fa-helmet-safety', category: ['solid', 'helmet', 'safety', ]}, 
  {value: 'fa-solid fa-hot-tub-person', category: ['solid', 'hot', 'tub', 'person', ]}, 
  {value: 'fa-solid fa-hourglass-empty', category: ['solid', 'hourglass', 'empty', ]}, 
  {value: 'fa-solid fa-house', category: ['solid', 'house', ]}, 
  {value: 'fa-solid fa-house-chimney', category: ['solid', 'house', 'chimney', ]}, 
  {value: 'fa-solid fa-house-chimney-crack', category: ['solid', 'house', 'chimney', 'crack', ]}, 
  {value: 'fa-solid fa-house-chimney-medical', category: ['solid', 'house', 'chimney', 'medical', ]}, 
  {value: 'fa-solid fa-house-chimney-user', category: ['solid', 'house', 'chimney', 'user', ]}, 
  {value: 'fa-solid fa-house-chimney-window', category: ['solid', 'house', 'chimney', 'window', ]}, 
  {value: 'fa-solid fa-house-crack', category: ['solid', 'house', 'crack', ]}, 
  {value: 'fa-solid fa-house-laptop', category: ['solid', 'house', 'laptop', ]}, 
  {value: 'fa-solid fa-house-medical', category: ['solid', 'house', 'medical', ]}, 
  {value: 'fa-solid fa-hryvnia-sign', category: ['solid', 'hryvnia', 'sign', ]}, 
  {value: 'fa-solid fa-i', category: ['solid', 'i', ]}, 
  {value: 'fa-solid fa-id-card-clip', category: ['solid', 'id', 'card', 'clip', ]}, 
  {value: 'fa-solid fa-image-portrait', category: ['solid', 'image', 'portrait', ]}, 
  {value: 'fa-solid fa-indian-rupee-sign', category: ['solid', 'indian', 'rupee', 'sign', ]}, 
  {value: 'fa-solid fa-j', category: ['solid', 'j', ]}, 
  {value: 'fa-solid fa-jet-fighter', category: ['solid', 'jet', 'fighter', ]}, 
  {value: 'fa-solid fa-k', category: ['solid', 'k', ]}, 
  {value: 'fa-solid fa-kip-sign', category: ['solid', 'kip', 'sign', ]}, 
  {value: 'fa-solid fa-kit-medical', category: ['solid', 'kit', 'medical', ]}, 
  {value: 'fa-solid fa-l', category: ['solid', 'l', ]}, 
  {value: 'fa-solid fa-lari-sign', category: ['solid', 'lari', 'sign', ]}, 
  {value: 'fa-solid fa-left-long', category: ['solid', 'left', 'long', ]}, 
  {value: 'fa-solid fa-left-right', category: ['solid', 'left', 'right', ]}, 
  {value: 'fa-solid fa-link-slash', category: ['solid', 'link', 'slash', ]}, 
  {value: 'fa-solid fa-list-check', category: ['solid', 'list', 'check', ]}, 
  {value: 'fa-solid fa-litecoin-sign', category: ['solid', 'litecoin', 'sign', ]}, 
  {value: 'fa-solid fa-location-crosshairs', category: ['solid', 'location', 'crosshairs', ]}, 
  {value: 'fa-solid fa-location-dot', category: ['solid', 'location', 'dot', ]}, 
  {value: 'fa-solid fa-location-pin', category: ['solid', 'location', 'pin', ]}, 
  {value: 'fa-solid fa-m', category: ['solid', 'm', ]}, 
  {value: 'fa-solid fa-magnifying-glass', category: ['solid', 'magnifying', 'glass', ]}, 
  {value: 'fa-solid fa-magnifying-glass-dollar', category: ['solid', 'magnifying', 'glass', 'dollar', ]}, 
  {value: 'fa-solid fa-magnifying-glass-location', category: ['solid', 'magnifying', 'glass', 'location', ]}, 
  {value: 'fa-solid fa-magnifying-glass-minus', category: ['solid', 'magnifying', 'glass', 'minus', ]}, 
  {value: 'fa-solid fa-magnifying-glass-plus', category: ['solid', 'magnifying', 'glass', 'plus', ]}, 
  {value: 'fa-solid fa-manat-sign', category: ['solid', 'manat', 'sign', ]}, 
  {value: 'fa-solid fa-map-location', category: ['solid', 'map', 'location', ]}, 
  {value: 'fa-solid fa-map-location-dot', category: ['solid', 'map', 'location', 'dot', ]}, 
  {value: 'fa-solid fa-mars-and-venus', category: ['solid', 'mars', 'and', 'venus', ]}, 
  {value: 'fa-solid fa-mars-stroke-right', category: ['solid', 'mars', 'stroke', 'right', ]}, 
  {value: 'fa-solid fa-mars-stroke-up', category: ['solid', 'mars', 'stroke', 'up', ]}, 
  {value: 'fa-solid fa-martini-glass', category: ['solid', 'martini', 'glass', ]}, 
  {value: 'fa-solid fa-martini-glass-citrus', category: ['solid', 'martini', 'glass', 'citrus', ]}, 
  {value: 'fa-solid fa-martini-glass-empty', category: ['solid', 'martini', 'glass', 'empty', ]}, 
  {value: 'fa-solid fa-mask-face', category: ['solid', 'mask', 'face', ]}, 
  {value: 'fa-solid fa-masks-theater', category: ['solid', 'masks', 'theater', ]}, 
  {value: 'fa-solid fa-maximize', category: ['solid', 'maximize', ]}, 
  {value: 'fa-solid fa-message', category: ['solid', 'message', ]}, 
  {value: 'fa-solid fa-microphone-lines', category: ['solid', 'microphone', 'lines', ]}, 
  {value: 'fa-solid fa-microphone-lines-slash', category: ['solid', 'microphone', 'lines', 'slash', ]}, 
  {value: 'fa-solid fa-mill-sign', category: ['solid', 'mill', 'sign', ]}, 
  {value: 'fa-solid fa-minimize', category: ['solid', 'minimize', ]}, 
  {value: 'fa-solid fa-mobile-button', category: ['solid', 'mobile', 'button', ]}, 
  {value: 'fa-solid fa-mobile-screen-button', category: ['solid', 'mobile', 'screen', 'button', ]}, 
  {value: 'fa-solid fa-money-bill-1', category: ['solid', 'money', 'bill', '1', ]}, 
  {value: 'fa-solid fa-money-bill-1-wave', category: ['solid', 'money', 'bill', '1', 'wave', ]}, 
  {value: 'fa-solid fa-money-check-dollar', category: ['solid', 'money', 'check', 'dollar', ]}, 
  {value: 'fa-solid fa-mug-saucer', category: ['solid', 'mug', 'saucer', ]}, 
  {value: 'fa-solid fa-n', category: ['solid', 'n', ]}, 
  {value: 'fa-solid fa-naira-sign', category: ['solid', 'naira', 'sign', ]}, 
  {value: 'fa-solid fa-note-sticky', category: ['solid', 'note', 'sticky', ]}, 
  {value: 'fa-solid fa-p', category: ['solid', 'p', ]}, 
  {value: 'fa-solid fa-paintbrush', category: ['solid', 'paintbrush', ]}, 
  {value: 'fa-solid fa-panorama', category: ['solid', 'panorama', ]}, 
  {value: 'fa-solid fa-pen-clip', category: ['solid', 'pen', 'clip', ]}, 
  {value: 'fa-solid fa-pen-ruler', category: ['solid', 'pen', 'ruler', ]}, 
  {value: 'fa-solid fa-pen-to-square', category: ['solid', 'pen', 'to', 'square', ]}, 
  {value: 'fa-solid fa-people-arrows-left-right', category: ['solid', 'people', 'arrows', 'left', 'right', ]}, 
  {value: 'fa-solid fa-people-carry-box', category: ['solid', 'people', 'carry', 'box', ]}, 
  {value: 'fa-solid fa-person', category: ['solid', 'person', ]}, 
  {value: 'fa-solid fa-person-biking', category: ['solid', 'person', 'biking', ]}, 
  {value: 'fa-solid fa-person-dots-from-line', category: ['solid', 'person', 'dots', 'from', 'line', ]}, 
  {value: 'fa-solid fa-person-dress', category: ['solid', 'person', 'dress', ]}, 
  {value: 'fa-solid fa-person-hiking', category: ['solid', 'person', 'hiking', ]}, 
  {value: 'fa-solid fa-person-praying', category: ['solid', 'person', 'praying', ]}, 
  {value: 'fa-solid fa-person-running', category: ['solid', 'person', 'running', ]}, 
  {value: 'fa-solid fa-person-skating', category: ['solid', 'person', 'skating', ]}, 
  {value: 'fa-solid fa-person-skiing', category: ['solid', 'person', 'skiing', ]}, 
  {value: 'fa-solid fa-person-skiing-nordic', category: ['solid', 'person', 'skiing', 'nordic', ]}, 
  {value: 'fa-solid fa-person-snowboarding', category: ['solid', 'person', 'snowboarding', ]}, 
  {value: 'fa-solid fa-person-swimming', category: ['solid', 'person', 'swimming', ]}, 
  {value: 'fa-solid fa-person-walking', category: ['solid', 'person', 'walking', ]}, 
  {value: 'fa-solid fa-person-walking-with-cane', category: ['solid', 'person', 'walking', 'with', 'cane', ]}, 
  {value: 'fa-solid fa-peseta-sign', category: ['solid', 'peseta', 'sign', ]}, 
  {value: 'fa-solid fa-peso-sign', category: ['solid', 'peso', 'sign', ]}, 
  {value: 'fa-solid fa-phone-flip', category: ['solid', 'phone', 'flip', ]}, 
  {value: 'fa-solid fa-photo-film', category: ['solid', 'photo', 'film', ]}, 
  {value: 'fa-solid fa-plus-minus', category: ['solid', 'plus', 'minus', ]}, 
  {value: 'fa-solid fa-prescription-bottle-medical', category: ['solid', 'prescription', 'bottle', 'medical', ]}, 
  {value: 'fa-solid fa-q', category: ['solid', 'q', ]}, 
  {value: 'fa-solid fa-r', category: ['solid', 'r', ]}, 
  {value: 'fa-solid fa-rectangle-ad', category: ['solid', 'rectangle', 'ad', ]}, 
  {value: 'fa-solid fa-rectangle-list', category: ['solid', 'rectangle', 'list', ]}, 
  {value: 'fa-solid fa-rectangle-xmark', category: ['solid', 'rectangle', 'xmark', ]}, 
  {value: 'fa-solid fa-right-from-bracket', category: ['solid', 'right', 'from', 'bracket', ]}, 
  {value: 'fa-solid fa-right-left', category: ['solid', 'right', 'left', ]}, 
  {value: 'fa-solid fa-right-long', category: ['solid', 'right', 'long', ]}, 
  {value: 'fa-solid fa-right-to-bracket', category: ['solid', 'right', 'to', 'bracket', ]}, 
  {value: 'fa-solid fa-rotate', category: ['solid', 'rotate', ]}, 
  {value: 'fa-solid fa-rupiah-sign', category: ['solid', 'rupiah', 'sign', ]}, 
  {value: 'fa-solid fa-s', category: ['solid', 's', ]}, 
  {value: 'fa-solid fa-sailboat', category: ['solid', 'sailboat', ]}, 
  {value: 'fa-solid fa-scale-balanced', category: ['solid', 'scale', 'balanced', ]}, 
  {value: 'fa-solid fa-scale-unbalanced', category: ['solid', 'scale', 'unbalanced', ]}, 
  {value: 'fa-solid fa-scale-unbalanced-flip', category: ['solid', 'scale', 'unbalanced', 'flip', ]}, 
  {value: 'fa-solid fa-screwdriver-wrench', category: ['solid', 'screwdriver', 'wrench', ]}, 
  {value: 'fa-solid fa-scroll-torah', category: ['solid', 'scroll', 'torah', ]}, 
  {value: 'fa-solid fa-section', category: ['solid', 'section', ]}, 
  {value: 'fa-solid fa-share-from-square', category: ['solid', 'share', 'from', 'square', ]}, 
  {value: 'fa-solid fa-share-nodes', category: ['solid', 'share', 'nodes', ]}, 
  {value: 'fa-solid fa-shield-blank', category: ['solid', 'shield', 'blank', ]}, 
  {value: 'fa-solid fa-shirt', category: ['solid', 'shirt', ]}, 
  {value: 'fa-solid fa-shop', category: ['solid', 'shop', ]}, 
  {value: 'fa-solid fa-shop-slash', category: ['solid', 'shop', 'slash', ]}, 
  {value: 'fa-solid fa-shrimp', category: ['solid', 'shrimp', ]}, 
  {value: 'fa-solid fa-shuffle', category: ['solid', 'shuffle', ]}, 
  {value: 'fa-solid fa-shuttle-space', category: ['solid', 'shuttle', 'space', ]}, 
  {value: 'fa-solid fa-sign-hanging', category: ['solid', 'sign', 'hanging', ]}, 
  {value: 'fa-solid fa-signs-post', category: ['solid', 'signs', 'post', ]}, 
  {value: 'fa-solid fa-spaghetti-monster-flying', category: ['solid', 'spaghetti', 'monster', 'flying', ]}, 
  {value: 'fa-solid fa-spray-can-sparkles', category: ['solid', 'spray', 'can', 'sparkles', ]}, 
  {value: 'fa-solid fa-square-arrow-up-right', category: ['solid', 'square', 'arrow', 'up', 'right', ]}, 
  {value: 'fa-solid fa-square-caret-down', category: ['solid', 'square', 'caret', 'down', ]}, 
  {value: 'fa-solid fa-square-caret-left', category: ['solid', 'square', 'caret', 'left', ]}, 
  {value: 'fa-solid fa-square-caret-right', category: ['solid', 'square', 'caret', 'right', ]}, 
  {value: 'fa-solid fa-square-caret-up', category: ['solid', 'square', 'caret', 'up', ]}, 
  {value: 'fa-solid fa-square-check', category: ['solid', 'square', 'check', ]}, 
  {value: 'fa-solid fa-square-envelope', category: ['solid', 'square', 'envelope', ]}, 
  {value: 'fa-solid fa-square-h', category: ['solid', 'square', 'h', ]}, 
  {value: 'fa-solid fa-square-minus', category: ['solid', 'square', 'minus', ]}, 
  {value: 'fa-solid fa-square-parking', category: ['solid', 'square', 'parking', ]}, 
  {value: 'fa-solid fa-square-pen', category: ['solid', 'square', 'pen', ]}, 
  {value: 'fa-solid fa-square-phone', category: ['solid', 'square', 'phone', ]}, 
  {value: 'fa-solid fa-square-phone-flip', category: ['solid', 'square', 'phone', 'flip', ]}, 
  {value: 'fa-solid fa-square-plus', category: ['solid', 'square', 'plus', ]}, 
  {value: 'fa-solid fa-square-poll-horizontal', category: ['solid', 'square', 'poll', 'horizontal', ]}, 
  {value: 'fa-solid fa-square-poll-vertical', category: ['solid', 'square', 'poll', 'vertical', ]}, 
  {value: 'fa-solid fa-square-root-variable', category: ['solid', 'square', 'root', 'variable', ]}, 
  {value: 'fa-solid fa-square-rss', category: ['solid', 'square', 'rss', ]}, 
  {value: 'fa-solid fa-square-share-nodes', category: ['solid', 'square', 'share', 'nodes', ]}, 
  {value: 'fa-solid fa-square-up-right', category: ['solid', 'square', 'up', 'right', ]}, 
  {value: 'fa-solid fa-square-xmark', category: ['solid', 'square', 'xmark', ]}, 
  {value: 'fa-solid fa-stairs', category: ['solid', 'stairs', ]}, 
  {value: 'fa-solid fa-star-half-stroke', category: ['solid', 'star', 'half', 'stroke', ]}, 
  {value: 'fa-solid fa-sterling-sign', category: ['solid', 'sterling', 'sign', ]}, 
  {value: 'fa-solid fa-suitcase-medical', category: ['solid', 'suitcase', 'medical', ]}, 
  {value: 'fa-solid fa-t', category: ['solid', 't', ]}, 
  {value: 'fa-solid fa-table-cells', category: ['solid', 'table', 'cells', ]}, 
  {value: 'fa-solid fa-table-cells-large', category: ['solid', 'table', 'cells', 'large', ]}, 
  {value: 'fa-solid fa-table-columns', category: ['solid', 'table', 'columns', ]}, 
  {value: 'fa-solid fa-table-list', category: ['solid', 'table', 'list', ]}, 
  {value: 'fa-solid fa-table-tennis-paddle-ball', category: ['solid', 'table', 'tennis', 'paddle', 'ball', ]}, 
  {value: 'fa-solid fa-tablet-button', category: ['solid', 'tablet', 'button', ]}, 
  {value: 'fa-solid fa-tablet-screen-button', category: ['solid', 'tablet', 'screen', 'button', ]}, 
  {value: 'fa-solid fa-tachograph-digital', category: ['solid', 'tachograph', 'digital', ]}, 
  {value: 'fa-solid fa-temperature-empty', category: ['solid', 'temperature', 'empty', ]}, 
  {value: 'fa-solid fa-temperature-full', category: ['solid', 'temperature', 'full', ]}, 
  {value: 'fa-solid fa-temperature-half', category: ['solid', 'temperature', 'half', ]}, 
  {value: 'fa-solid fa-temperature-quarter', category: ['solid', 'temperature', 'quarter', ]}, 
  {value: 'fa-solid fa-temperature-three-quarters', category: ['solid', 'temperature', 'three', 'quarters', ]}, 
  {value: 'fa-solid fa-tenge-sign', category: ['solid', 'tenge', 'sign', ]}, 
  {value: 'fa-solid fa-text-slash', category: ['solid', 'text', 'slash', ]}, 
  {value: 'fa-solid fa-ticket-simple', category: ['solid', 'ticket', 'simple', ]}, 
  {value: 'fa-solid fa-timeline', category: ['solid', 'timeline', ]}, 
  {value: 'fa-solid fa-tower-broadcast', category: ['solid', 'tower', 'broadcast', ]}, 
  {value: 'fa-solid fa-train-subway', category: ['solid', 'train', 'subway', ]}, 
  {value: 'fa-solid fa-train-tram', category: ['solid', 'train', 'tram', ]}, 
  {value: 'fa-solid fa-trash-arrow-up', category: ['solid', 'trash', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-trash-can', category: ['solid', 'trash', 'can', ]}, 
  {value: 'fa-solid fa-trash-can-arrow-up', category: ['solid', 'trash', 'can', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-triangle-exclamation', category: ['solid', 'triangle', 'exclamation', ]}, 
  {value: 'fa-solid fa-truck-fast', category: ['solid', 'truck', 'fast', ]}, 
  {value: 'fa-solid fa-truck-medical', category: ['solid', 'truck', 'medical', ]}, 
  {value: 'fa-solid fa-truck-ramp-box', category: ['solid', 'truck', 'ramp', 'box', ]}, 
  {value: 'fa-solid fa-turkish-lira-sign', category: ['solid', 'turkish', 'lira', 'sign', ]}, 
  {value: 'fa-solid fa-turn-down', category: ['solid', 'turn', 'down', ]}, 
  {value: 'fa-solid fa-turn-up', category: ['solid', 'turn', 'up', ]}, 
  {value: 'fa-solid fa-u', category: ['solid', 'u', ]}, 
  {value: 'fa-solid fa-unlock-keyhole', category: ['solid', 'unlock', 'keyhole', ]}, 
  {value: 'fa-solid fa-up-down', category: ['solid', 'up', 'down', ]}, 
  {value: 'fa-solid fa-up-down-left-right', category: ['solid', 'up', 'down', 'left', 'right', ]}, 
  {value: 'fa-solid fa-up-long', category: ['solid', 'up', 'long', ]}, 
  {value: 'fa-solid fa-up-right-and-down-left-from-center', category: ['solid', 'up', 'right', 'and', 'down', 'left', 'from', 'center', ]}, 
  {value: 'fa-solid fa-up-right-from-square', category: ['solid', 'up', 'right', 'from', 'square', ]}, 
  {value: 'fa-solid fa-user-doctor', category: ['solid', 'user', 'doctor', ]}, 
  {value: 'fa-solid fa-user-gear', category: ['solid', 'user', 'gear', ]}, 
  {value: 'fa-solid fa-user-group', category: ['solid', 'user', 'group', ]}, 
  {value: 'fa-solid fa-user-large', category: ['solid', 'user', 'large', ]}, 
  {value: 'fa-solid fa-user-large-slash', category: ['solid', 'user', 'large', 'slash', ]}, 
  {value: 'fa-solid fa-user-pen', category: ['solid', 'user', 'pen', ]}, 
  {value: 'fa-solid fa-user-xmark', category: ['solid', 'user', 'xmark', ]}, 
  {value: 'fa-solid fa-users-gear', category: ['solid', 'users', 'gear', ]}, 
  {value: 'fa-solid fa-v', category: ['solid', 'v', ]}, 
  {value: 'fa-solid fa-van-shuttle', category: ['solid', 'van', 'shuttle', ]}, 
  {value: 'fa-solid fa-vault', category: ['solid', 'vault', ]}, 
  {value: 'fa-solid fa-virus-covid', category: ['solid', 'virus', 'covid', ]}, 
  {value: 'fa-solid fa-virus-covid-slash', category: ['solid', 'virus', 'covid', 'slash', ]}, 
  {value: 'fa-solid fa-volleyball', category: ['solid', 'volleyball', ]}, 
  {value: 'fa-solid fa-volume-high', category: ['solid', 'volume', 'high', ]}, 
  {value: 'fa-solid fa-volume-low', category: ['solid', 'volume', 'low', ]}, 
  {value: 'fa-solid fa-volume-xmark', category: ['solid', 'volume', 'xmark', ]}, 
  {value: 'fa-solid fa-w', category: ['solid', 'w', ]}, 
  {value: 'fa-solid fa-wand-magic', category: ['solid', 'wand', 'magic', ]}, 
  {value: 'fa-solid fa-wand-magic-sparkles', category: ['solid', 'wand', 'magic', 'sparkles', ]}, 
  {value: 'fa-solid fa-wand-sparkles', category: ['solid', 'wand', 'sparkles', ]}, 
  {value: 'fa-solid fa-water-ladder', category: ['solid', 'water', 'ladder', ]}, 
  {value: 'fa-solid fa-weight-scale', category: ['solid', 'weight', 'scale', ]}, 
  {value: 'fa-solid fa-whiskey-glass', category: ['solid', 'whiskey', 'glass', ]}, 
  {value: 'fa-solid fa-wine-glass-empty', category: ['solid', 'wine', 'glass', 'empty', ]}, 
  {value: 'fa-solid fa-x', category: ['solid', 'x', ]}, 
  {value: 'fa-solid fa-xmark', category: ['solid', 'xmark', ]}, 
  {value: 'fa-solid fa-y', category: ['solid', 'y', ]}, 
  {value: 'fa-solid fa-yin-yang', category: ['solid', 'yin', 'yang', ]}, 
  {value: 'fa-solid fa-z', category: ['solid', 'z', ]}, 
  {value: 'fas fa-stapler', category: ['stapler', ]}, 
  {value: 'fas fa-child-dress', category: ['child', 'dress', ]}, 
  {value: 'fas fa-child-reaching', category: ['child', 'reaching', ]}, 
  {value: 'fa fa-anchor-circle-check', category: ['anchor', 'circle', 'check', ]}, 
  {value: 'fa fa-anchor-circle-exclamation', category: ['anchor', 'circle', 'exclamation', ]}, 
  {value: 'fa fa-anchor-circle-xmark', category: ['anchor', 'circle', 'xmark', ]}, 
  {value: 'fa fa-anchor-lock', category: ['anchor', 'lock', ]}, 
  {value: 'fa fa-arrow-down-up-across-line', category: ['arrow', 'down', 'up', 'across', 'line', ]}, 
  {value: 'fa fa-arrow-down-up-lock', category: ['arrow', 'down', 'up', 'lock', ]}, 
  {value: 'fas fa-arrow-right-to-city', category: ['arrow', 'right', 'to', 'city', ]}, 
  {value: 'fas fa-arrow-up-from-ground-water', category: ['arrow', 'up', 'from', 'ground', 'water', ]}, 
  {value: 'fas fa-arrow-up-from-water-pump', category: ['arrow', 'up', 'from', 'water', 'pump', ]}, 
  {value: 'fas fa-arrow-up-right-dots', category: ['arrow', 'up', 'right', 'dots', ]}, 
  {value: 'fas fa-arrows-down-to-line', category: ['arrows', 'down', 'to', 'line', ]}, 
  {value: 'fas fa-arrows-down-to-people', category: ['arrows', 'down', 'to', 'people', ]}, 
  {value: 'fas fa-arrows-left-right-to-line', category: ['arrows', 'left', 'right', 'to', 'line', ]}, 
  {value: 'fas fa-arrows-spin', category: ['arrows', 'spin', ]}, 
  {value: 'fas fa-arrows-split-up-and-left', category: ['arrows', 'split', 'up', 'and', 'left', ]}, 
  {value: 'fas fa-arrows-to-circle', category: ['arrows', 'to', 'circle', ]}, 
  {value: 'fas fa-arrows-to-dot', category: ['arrows', 'to', 'dot', ]}, 
  {value: 'fas fa-arrows-to-eye', category: ['arrows', 'to', 'eye', ]}, 
  {value: 'fas fa-arrows-turn-right', category: ['arrows', 'turn', 'right', ]}, 
  {value: 'fas fa-arrows-turn-to-dots', category: ['arrows', 'turn', 'to', 'dots', ]}, 
  {value: 'fas fa-arrows-up-to-line', category: ['arrows', 'up', 'to', 'line', ]}, 
  {value: 'fas fa-bore-hole', category: ['bore', 'hole', ]}, 
  {value: 'fas fa-bottle-droplet', category: ['bottle', 'droplet', ]}, 
  {value: 'fas fa-bottle-water', category: ['bottle', 'water', ]}, 
  {value: 'fas fa-bowl-food', category: ['bowl', 'food', ]}, 
  {value: 'fas fa-boxes-packing', category: ['boxes', 'packing', ]}, 
  {value: 'fas fa-bridge', category: ['bridge', ]}, 
  {value: 'fas fa-bridge-circle-check', category: ['bridge', 'circle', 'check', ]}, 
  {value: 'fas fa-bridge-circle-exclamation', category: ['bridge', 'circle', 'exclamation', ]}, 
  {value: 'fas fa-bridge-circle-xmark', category: ['bridge', 'circle', 'xmark', ]}, 
  {value: 'fas fa-bridge-lock', category: ['bridge', 'lock', ]}, 
  {value: 'fas fa-bridge-water', category: ['bridge', 'water', ]}, 
  {value: 'fas fa-bucket', category: ['bucket', ]}, 
  {value: 'fa-solid fa-bugs', category: ['solid', 'bugs', ]}, 
  {value: 'fa-solid fa-building-circle-arrow-right', category: ['solid', 'building', 'circle', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-building-circle-check', category: ['solid', 'building', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-building-circle-exclamation', category: ['solid', 'building', 'circle', 'exclamation', ]}, 
  {value: 'fab fa-accessible-icon', category: ['accessible', 'icon', ]}, 
  {value: 'fab fa-accusoft', category: ['accusoft', ]}, 
  {value: 'fab fa-acquisitions-incorporated', category: ['acquisitions', 'incorporated', ]}, 
  {value: 'fab fa-adversal', category: ['adversal', ]}, 
  {value: 'fab fa-affiliatetheme', category: ['affiliatetheme', ]}, 
  {value: 'fab fa-airbnb', category: ['airbnb', ]}, 
  {value: 'fab fa-algolia', category: ['algolia', ]}, 
  {value: 'fab fa-alipay', category: ['alipay', ]}, 
  {value: 'fab fa-amazon-pay', category: ['amazon', 'pay', ]}, 
  {value: 'fab fa-amilia', category: ['amilia', ]}, 
  {value: 'fab fa-angrycreative', category: ['angrycreative', ]}, 
  {value: 'fab fa-angular', category: ['angular', ]}, 
  {value: 'fab fa-app-store-ios', category: ['app', 'store', 'ios', ]}, 
  {value: 'fab fa-app-store', category: ['app', 'store', ]}, 
  {value: 'fab fa-apper', category: ['apper', ]}, 
  {value: 'fab fa-apple-pay', category: ['apple', 'pay', ]}, 
  {value: 'fab fa-artstation', category: ['artstation', ]}, 
  {value: 'fab fa-asymmetrik', category: ['asymmetrik', ]}, 
  {value: 'fab fa-atlassian', category: ['atlassian', ]}, 
  {value: 'fab fa-audible', category: ['audible', ]}, 
  {value: 'fab fa-autoprefixer', category: ['autoprefixer', ]}, 
  {value: 'fab fa-avianex', category: ['avianex', ]}, 
  {value: 'fab fa-aviato', category: ['aviato', ]}, 
  {value: 'fab fa-aws', category: ['aws', ]}, 
  {value: 'fab fa-battle-net', category: ['battle', 'net', ]}, 
  {value: 'fab fa-bimobject', category: ['bimobject', ]}, 
  {value: 'fab fa-bity', category: ['bity', ]}, 
  {value: 'fab fa-blackberry', category: ['blackberry', ]}, 
  {value: 'fab fa-blogger-b', category: ['blogger', 'b', ]}, 
  {value: 'fab fa-blogger', category: ['blogger', ]}, 
  {value: 'fab fa-bootstrap', category: ['bootstrap', ]}, 
  {value: 'fab fa-buffer', category: ['buffer', ]}, 
  {value: 'fab fa-buromobelexperte', category: ['buromobelexperte', ]}, 
  {value: 'fab fa-buy-n-large', category: ['buy', 'n', 'large', ]}, 
  {value: 'fab fa-canadian-maple-leaf', category: ['canadian', 'maple', 'leaf', ]}, 
  {value: 'fab fa-cc-amazon-pay', category: ['cc', 'amazon', 'pay', ]}, 
  {value: 'fab fa-cc-apple-pay', category: ['cc', 'apple', 'pay', ]}, 
  {value: 'fab fa-centercode', category: ['centercode', ]}, 
  {value: 'fab fa-centos', category: ['centos', ]}, 
  {value: 'fab fa-chromecast', category: ['chromecast', ]}, 
  {value: 'fab fa-cloudflare', category: ['cloudflare', ]}, 
  {value: 'fab fa-cloudscale', category: ['cloudscale', ]}, 
  {value: 'fab fa-cloudsmith', category: ['cloudsmith', ]}, 
  {value: 'fab fa-cloudversify', category: ['cloudversify', ]}, 
  {value: 'fab fa-confluence', category: ['confluence', ]}, 
  {value: 'fab fa-cotton-bureau', category: ['cotton', 'bureau', ]}, 
  {value: 'fab fa-cpanel', category: ['cpanel', ]}, 
  {value: 'fab fa-creative-commons-by', category: ['creative', 'commons', 'by', ]}, 
  {value: 'fab fa-creative-commons-nc-eu', category: ['creative', 'commons', 'nc', 'eu', ]}, 
  {value: 'fab fa-creative-commons-nc-jp', category: ['creative', 'commons', 'nc', 'jp', ]}, 
  {value: 'fab fa-creative-commons-nc', category: ['creative', 'commons', 'nc', ]}, 
  {value: 'fab fa-creative-commons-nd', category: ['creative', 'commons', 'nd', ]}, 
  {value: 'fab fa-creative-commons-pd-alt', category: ['creative', 'commons', 'pd', 'alt', ]}, 
  {value: 'fab fa-creative-commons-pd', category: ['creative', 'commons', 'pd', ]}, 
  {value: 'fab fa-creative-commons-remix', category: ['creative', 'commons', 'remix', ]}, 
  {value: 'fab fa-creative-commons-sa', category: ['creative', 'commons', 'sa', ]}, 
  {value: 'fab fa-creative-commons-sampling-plus', category: ['creative', 'commons', 'sampling', 'plus', ]}, 
  {value: 'fab fa-creative-commons-sampling', category: ['creative', 'commons', 'sampling', ]}, 
  {value: 'fab fa-creative-commons-share', category: ['creative', 'commons', 'share', ]}, 
  {value: 'fab fa-creative-commons-zero', category: ['creative', 'commons', 'zero', ]}, 
  {value: 'fab fa-critical-role', category: ['critical', 'role', ]}, 
  {value: 'fab fa-css3-alt', category: ['css3', 'alt', ]}, 
  {value: 'fab fa-cuttlefish', category: ['cuttlefish', ]}, 
  {value: 'fab fa-d-and-d-beyond', category: ['d', 'and', 'd', 'beyond', ]}, 
  {value: 'fab fa-d-and-d', category: ['d', 'and', 'd', ]}, 
  {value: 'fab fa-dailymotion', category: ['dailymotion', ]}, 
  {value: 'fab fa-deezer', category: ['deezer', ]}, 
  {value: 'fab fa-deploydog', category: ['deploydog', ]}, 
  {value: 'fab fa-deskpro', category: ['deskpro', ]}, 
  {value: 'fab fa-dev', category: ['dev', ]}, 
  {value: 'fab fa-dhl', category: ['dhl', ]}, 
  {value: 'fab fa-diaspora', category: ['diaspora', ]}, 
  {value: 'fab fa-discord', category: ['discord', ]}, 
  {value: 'fab fa-discourse', category: ['discourse', ]}, 
  {value: 'fab fa-dochub', category: ['dochub', ]}, 
  {value: 'fab fa-docker', category: ['docker', ]}, 
  {value: 'fab fa-draft2digital', category: ['draft2digital', ]}, 
  {value: 'fab fa-dribbble-square', category: ['dribbble', 'square', ]}, 
  {value: 'fab fa-dyalog', category: ['dyalog', ]}, 
  {value: 'fab fa-earlybirds', category: ['earlybirds', ]}, 
  {value: 'fab fa-ebay', category: ['ebay', ]}, 
  {value: 'fab fa-edge-legacy', category: ['edge', 'legacy', ]}, 
  {value: 'fab fa-elementor', category: ['elementor', ]}, 
  {value: 'fab fa-ello', category: ['ello', ]}, 
  {value: 'fab fa-ember', category: ['ember', ]}, 
  {value: 'fab fa-erlang', category: ['erlang', ]}, 
  {value: 'fab fa-ethereum', category: ['ethereum', ]}, 
  {value: 'fab fa-evernote', category: ['evernote', ]}, 
  {value: 'fab fa-facebook-messenger', category: ['facebook', 'messenger', ]}, 
  {value: 'fab fa-fantasy-flight-games', category: ['fantasy', 'flight', 'games', ]}, 
  {value: 'fab fa-fedex', category: ['fedex', ]}, 
  {value: 'fab fa-fedora', category: ['fedora', ]}, 
  {value: 'fab fa-figma', category: ['figma', ]}, 
  {value: 'fab fa-firefox-browser', category: ['firefox', 'browser', ]}, 
  {value: 'fab fa-firstdraft', category: ['firstdraft', ]}, 
  {value: 'fab fa-flipboard', category: ['flipboard', ]}, 
  {value: 'fab fa-fly', category: ['fly', ]}, 
  {value: 'fab fa-font-awesome-alt', category: ['font', 'awesome', 'alt', ]}, 
  {value: 'fab fa-font-awesome-flag', category: ['font', 'awesome', 'flag', ]}, 
  {value: 'fab fa-font-awesome-logo-full', category: ['font', 'awesome', 'logo', 'full', ]}, 
  {value: 'fab fa-fonticons-fi', category: ['fonticons', 'fi', ]}, 
  {value: 'fab fa-fort-awesome-alt', category: ['fort', 'awesome', 'alt', ]}, 
  {value: 'fab fa-freebsd', category: ['freebsd', ]}, 
  {value: 'fab fa-fulcrum', category: ['fulcrum', ]}, 
  {value: 'fab fa-galactic-republic', category: ['galactic', 'republic', ]}, 
  {value: 'fab fa-galactic-senate', category: ['galactic', 'senate', ]}, 
  {value: 'fab fa-git-alt', category: ['git', 'alt', ]}, 
  {value: 'fab fa-gitkraken', category: ['gitkraken', ]}, 
  {value: 'fab fa-gitter', category: ['gitter', ]}, 
  {value: 'fab fa-gofore', category: ['gofore', ]}, 
  {value: 'fab fa-goodreads-g', category: ['goodreads', 'g', ]}, 
  {value: 'fab fa-goodreads', category: ['goodreads', ]}, 
  {value: 'fab fa-google-drive', category: ['google', 'drive', ]}, 
  {value: 'fab fa-google-pay', category: ['google', 'pay', ]}, 
  {value: 'fab fa-google-play', category: ['google', 'play', ]}, 
  {value: 'fab fa-google-plus-g', category: ['google', 'plus', 'g', ]}, 
  {value: 'fab fa-gripfire', category: ['gripfire', ]}, 
  {value: 'fab fa-grunt', category: ['grunt', ]}, 
  {value: 'fab fa-guilded', category: ['guilded', ]}, 
  {value: 'fab fa-gulp', category: ['gulp', ]}, 
  {value: 'fab fa-hacker-news-square', category: ['hacker', 'news', 'square', ]}, 
  {value: 'fab fa-hackerrank', category: ['hackerrank', ]}, 
  {value: 'fab fa-hips', category: ['hips', ]}, 
  {value: 'fab fa-hire-a-helper', category: ['hire', 'a', 'helper', ]}, 
  {value: 'fab fa-hive', category: ['hive', ]}, 
  {value: 'fab fa-hooli', category: ['hooli', ]}, 
  {value: 'fab fa-hornbill', category: ['hornbill', ]}, 
  {value: 'fab fa-hotjar', category: ['hotjar', ]}, 
  {value: 'fab fa-hubspot', category: ['hubspot', ]}, 
  {value: 'fab fa-ideal', category: ['ideal', ]}, 
  {value: 'fab fa-innosoft', category: ['innosoft', ]}, 
  {value: 'fab fa-instagram-square', category: ['instagram', 'square', ]}, 
  {value: 'fab fa-instalod', category: ['instalod', ]}, 
  {value: 'fab fa-intercom', category: ['intercom', ]}, 
  {value: 'fab fa-invision', category: ['invision', ]}, 
  {value: 'fab fa-itch-io', category: ['itch', 'io', ]}, 
  {value: 'fab fa-itunes-note', category: ['itunes', 'note', ]}, 
  {value: 'fab fa-itunes', category: ['itunes', ]}, 
  {value: 'fab fa-java', category: ['java', ]}, 
  {value: 'fab fa-jenkins', category: ['jenkins', ]}, 
  {value: 'fab fa-jira', category: ['jira', ]}, 
  {value: 'fab fa-joget', category: ['joget', ]}, 
  {value: 'fab fa-js-square', category: ['js', 'square', ]}, 
  {value: 'fab fa-js', category: ['js', ]}, 
  {value: 'fab fa-kaggle', category: ['kaggle', ]}, 
  {value: 'fab fa-keybase', category: ['keybase', ]}, 
  {value: 'fab fa-keycdn', category: ['keycdn', ]}, 
  {value: 'fab fa-kickstarter-k', category: ['kickstarter', 'k', ]}, 
  {value: 'fab fa-kickstarter', category: ['kickstarter', ]}, 
  {value: 'fab fa-korvue', category: ['korvue', ]}, 
  {value: 'fab fa-laravel', category: ['laravel', ]}, 
  {value: 'fab fa-less', category: ['less', ]}, 
  {value: 'fab fa-line', category: ['line', ]}, 
  {value: 'fab fa-linkedin-in', category: ['linkedin', 'in', ]}, 
  {value: 'fab fa-lyft', category: ['lyft', ]}, 
  {value: 'fab fa-magento', category: ['magento', ]}, 
  {value: 'fab fa-mailchimp', category: ['mailchimp', ]}, 
  {value: 'fab fa-mandalorian', category: ['mandalorian', ]}, 
  {value: 'fab fa-markdown', category: ['markdown', ]}, 
  {value: 'fab fa-mastodon', category: ['mastodon', ]}, 
  {value: 'fab fa-mdb', category: ['mdb', ]}, 
  {value: 'fab fa-medapps', category: ['medapps', ]}, 
  {value: 'fab fa-medium-m', category: ['medium', 'm', ]}, 
  {value: 'fab fa-medrt', category: ['medrt', ]}, 
  {value: 'fab fa-megaport', category: ['megaport', ]}, 
  {value: 'fab fa-mendeley', category: ['mendeley', ]}, 
  {value: 'fab fa-microblog', category: ['microblog', ]}, 
  {value: 'fab fa-microsoft', category: ['microsoft', ]}, 
  {value: 'fab fa-mix', category: ['mix', ]}, 
  {value: 'fab fa-mixer', category: ['mixer', ]}, 
  {value: 'fab fa-mizuni', category: ['mizuni', ]}, 
  {value: 'fab fa-monero', category: ['monero', ]}, 
  {value: 'fab fa-napster', category: ['napster', ]}, 
  {value: 'fab fa-neos', category: ['neos', ]}, 
  {value: 'fab fa-nimblr', category: ['nimblr', ]}, 
  {value: 'fab fa-node-js', category: ['node', 'js', ]}, 
  {value: 'fab fa-node', category: ['node', ]}, 
  {value: 'fab fa-npm', category: ['npm', ]}, 
  {value: 'fab fa-ns8', category: ['ns8', ]}, 
  {value: 'fab fa-nutritionix', category: ['nutritionix', ]}, 
  {value: 'fab fa-page4', category: ['page4', ]}, 
  {value: 'fab fa-palfed', category: ['palfed', ]}, 
  {value: 'fab fa-patreon', category: ['patreon', ]}, 
  {value: 'fab fa-penny-arcade', category: ['penny', 'arcade', ]}, 
  {value: 'fab fa-perbyte', category: ['perbyte', ]}, 
  {value: 'fab fa-periscope', category: ['periscope', ]}, 
  {value: 'fab fa-phabricator', category: ['phabricator', ]}, 
  {value: 'fab fa-phoenix-framework', category: ['phoenix', 'framework', ]}, 
  {value: 'fab fa-phoenix-squadron', category: ['phoenix', 'squadron', ]}, 
  {value: 'fab fa-php', category: ['php', ]}, 
  {value: 'fab fa-pied-piper-hat', category: ['pied', 'piper', 'hat', ]}, 
  {value: 'fab fa-pied-piper-square', category: ['pied', 'piper', 'square', ]}, 
  {value: 'fab fa-playstation', category: ['playstation', ]}, 
  {value: 'fab fa-pushed', category: ['pushed', ]}, 
  {value: 'fab fa-python', category: ['python', ]}, 
  {value: 'fab fa-quinscape', category: ['quinscape', ]}, 
  {value: 'fab fa-r-project', category: ['r', 'project', ]}, 
  {value: 'fab fa-raspberry-pi', category: ['raspberry', 'pi', ]}, 
  {value: 'fab fa-react', category: ['react', ]}, 
  {value: 'fab fa-reacteurope', category: ['reacteurope', ]}, 
  {value: 'fab fa-readme', category: ['readme', ]}, 
  {value: 'fab fa-red-river', category: ['red', 'river', ]}, 
  {value: 'fab fa-redhat', category: ['redhat', ]}, 
  {value: 'fab fa-replyd', category: ['replyd', ]}, 
  {value: 'fab fa-researchgate', category: ['researchgate', ]}, 
  {value: 'fab fa-resolving', category: ['resolving', ]}, 
  {value: 'fab fa-rev', category: ['rev', ]}, 
  {value: 'fab fa-rocketchat', category: ['rocketchat', ]}, 
  {value: 'fab fa-rockrms', category: ['rockrms', ]}, 
  {value: 'fab fa-rust', category: ['rust', ]}, 
  {value: 'fab fa-salesforce', category: ['salesforce', ]}, 
  {value: 'fab fa-sass', category: ['sass', ]}, 
  {value: 'fab fa-schlix', category: ['schlix', ]}, 
  {value: 'fab fa-searchengin', category: ['searchengin', ]}, 
  {value: 'fab fa-sellcast', category: ['sellcast', ]}, 
  {value: 'fab fa-servicestack', category: ['servicestack', ]}, 
  {value: 'fab fa-shopify', category: ['shopify', ]}, 
  {value: 'fab fa-shopware', category: ['shopware', ]}, 
  {value: 'fab fa-sistrix', category: ['sistrix', ]}, 
  {value: 'fab fa-sith', category: ['sith', ]}, 
  {value: 'fab fa-sketch', category: ['sketch', ]}, 
  {value: 'fab fa-slack-hash', category: ['slack', 'hash', ]}, 
  {value: 'fab fa-sourcetree', category: ['sourcetree', ]}, 
  {value: 'fab fa-speakap', category: ['speakap', ]}, 
  {value: 'fab fa-speaker-deck', category: ['speaker', 'deck', ]}, 
  {value: 'fab fa-squarespace', category: ['squarespace', ]}, 
  {value: 'fab fa-stackpath', category: ['stackpath', ]}, 
  {value: 'fab fa-staylinked', category: ['staylinked', ]}, 
  {value: 'fab fa-steam-symbol', category: ['steam', 'symbol', ]}, 
  {value: 'fab fa-sticker-mule', category: ['sticker', 'mule', ]}, 
  {value: 'fab fa-strava', category: ['strava', ]}, 
  {value: 'fab fa-stripe-s', category: ['stripe', 's', ]}, 
  {value: 'fab fa-stripe', category: ['stripe', ]}, 
  {value: 'fab fa-studiovinari', category: ['studiovinari', ]}, 
  {value: 'fab fa-supple', category: ['supple', ]}, 
  {value: 'fab fa-suse', category: ['suse', ]}, 
  {value: 'fab fa-swift', category: ['swift', ]}, 
  {value: 'fab fa-symfony', category: ['symfony', ]}, 
  {value: 'fab fa-teamspeak', category: ['teamspeak', ]}, 
  {value: 'fab fa-telegram-plane', category: ['telegram', 'plane', ]}, 
  {value: 'fab fa-the-red-yeti', category: ['the', 'red', 'yeti', ]}, 
  {value: 'fab fa-themeco', category: ['themeco', ]}, 
  {value: 'fab fa-think-peaks', category: ['think', 'peaks', ]}, 
  {value: 'fab fa-tiktok', category: ['tiktok', ]}, 
  {value: 'fab fa-trade-federation', category: ['trade', 'federation', ]}, 
  {value: 'fab fa-typo3', category: ['typo3', ]}, 
  {value: 'fab fa-uber', category: ['uber', ]}, 
  {value: 'fab fa-ubuntu', category: ['ubuntu', ]}, 
  {value: 'fab fa-uikit', category: ['uikit', ]}, 
  {value: 'fab fa-umbraco', category: ['umbraco', ]}, 
  {value: 'fab fa-uncharted', category: ['uncharted', ]}, 
  {value: 'fab fa-uniregistry', category: ['uniregistry', ]}, 
  {value: 'fab fa-unity', category: ['unity', ]}, 
  {value: 'fab fa-unsplash', category: ['unsplash', ]}, 
  {value: 'fab fa-untappd', category: ['untappd', ]}, 
  {value: 'fab fa-ups', category: ['ups', ]}, 
  {value: 'fab fa-usps', category: ['usps', ]}, 
  {value: 'fab fa-ussunnah', category: ['ussunnah', ]}, 
  {value: 'fab fa-vaadin', category: ['vaadin', ]}, 
  {value: 'fab fa-viber', category: ['viber', ]}, 
  {value: 'fab fa-vimeo-v', category: ['vimeo', 'v', ]}, 
  {value: 'fab fa-vnv', category: ['vnv', ]}, 
  {value: 'fab fa-vuejs', category: ['vuejs', ]}, 
  {value: 'fab fa-watchman-monitoring', category: ['watchman', 'monitoring', ]}, 
  {value: 'fab fa-waze', category: ['waze', ]}, 
  {value: 'fab fa-weebly', category: ['weebly', ]}, 
  {value: 'fab fa-whatsapp-square', category: ['whatsapp', 'square', ]}, 
  {value: 'fab fa-whmcs', category: ['whmcs', ]}, 
  {value: 'fab fa-wix', category: ['wix', ]}, 
  {value: 'fab fa-wodu', category: ['wodu', ]}, 
  {value: 'fab fa-wolf-pack-battalion', category: ['wolf', 'pack', 'battalion', ]}, 
  {value: 'fab fa-wordpress-simple', category: ['wordpress', 'simple', ]}, 
  {value: 'fab fa-wpressr', category: ['wpressr', ]}, 
  {value: 'fab fa-xbox', category: ['xbox', ]}, 
  {value: 'fab fa-yammer', category: ['yammer', ]}, 
  {value: 'fab fa-yandex-international', category: ['yandex', 'international', ]}, 
  {value: 'fab fa-yandex', category: ['yandex', ]}, 
  {value: 'fab fa-yarn', category: ['yarn', ]}, 
  {value: 'fab fa-zhihu', category: ['zhihu', ]}, 
  {value: 'fa-brands fa-facebook', category: ['brands', 'fb', 'facebook', ]}, 
  {value: 'fa-brands fa-42-group', category: ['brands', '42', 'group', ]}, 
  {value: 'fa-brands fa-bilibili', category: ['brands', 'bilibili', ]}, 
  {value: 'fa-brands fa-bots', category: ['brands', 'bots', ]}, 
  {value: 'fa-brands fa-brave-reverse', category: ['brands', 'brave', 'reverse', ]}, 
  {value: 'fa-brands fa-brave', category: ['brands', 'brave', ]}, 
  {value: 'fa-brands fa-cmplid', category: ['brands', 'cmplid', ]}, 
  {value: 'fa-brands fa-debian', category: ['brands', 'debian', ]}, 
  {value: 'fa-brands fa-golang', category: ['brands', 'golang', ]}, 
  {value: 'fa-brands fa-google-scholar', category: ['brands', 'google', 'scholar', ]}, 
  {value: 'fa-brands fa-hashnode', category: ['brands', 'hashnode', ]}, 
  {value: 'fa-brands fa-letterboxd', category: ['brands', 'letterboxd', ]}, 
  {value: 'fa-brands fa-meta', category: ['brands', 'meta', ]}, 
  {value: 'fa-brands fa-mintbit', category: ['brands', 'mintbit', ]}, 
  {value: 'fa-brands fa-nfc-directional', category: ['brands', 'nfc', 'directional', ]}, 
  {value: 'fa-brands fa-nfc-symbol', category: ['brands', 'nfc', 'symbol', ]}, 
  {value: 'fa-brands fa-padlet', category: ['brands', 'padlet', ]}, 
  {value: 'fa-brands fa-pix', category: ['brands', 'pix', ]}, 
  {value: 'fa-brands fa-pixiv', category: ['brands', 'pixiv', ]}, 
  {value: 'fa-brands fa-screenpal', category: ['brands', 'screenpal', ]}, 
  {value: 'fa-brands fa-shoelace', category: ['brands', 'shoelace', ]}, 
  {value: 'fa-brands fa-signal-messenger', category: ['brands', 'signal', 'messenger', ]}, 
  {value: 'fa-brands fa-sitrox', category: ['brands', 'sitrox', ]}, 
  {value: 'fa-brands fa-space-awesome', category: ['brands', 'space', 'awesome', ]}, 
  {value: 'fa-brands fa-stubber', category: ['brands', 'stubber', ]}, 
  {value: 'fa-brands fa-threads', category: ['brands', 'threads', ]}, 
  {value: 'fa-brands fa-upwork', category: ['brands', 'upwork', ]}, 
  {value: 'fa-brands fa-webflow', category: ['brands', 'webflow', ]}, 
  {value: 'fa-brands fa-wirsindhandwerk', category: ['brands', 'wirsindhandwerk', ]}, 
  {value: 'fa-solid fa-0', category: ['solid', '0', ]}, 
  {value: 'fa-solid fa-bangladeshi-taka-sign', category: ['solid', 'bangladeshi', 'taka', 'sign', ]}, 
  {value: 'fa-solid fa-book-bookmark', category: ['solid', 'book', 'bookmark', ]}, 
  {value: 'fa-solid fa-book-tanakh', category: ['solid', 'book', 'tanakh', ]}, 
  {value: 'fa-solid fa-bowl-rice', category: ['solid', 'bowl', 'rice', ]}, 
  {value: 'fa-solid fa-building-circle-xmark', category: ['solid', 'building', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-building-flag', category: ['solid', 'building', 'flag', ]}, 
  {value: 'fa-solid fa-building-lock', category: ['solid', 'building', 'lock', ]}, 
  {value: 'fa-solid fa-building-ngo', category: ['solid', 'building', 'ngo', ]}, 
  {value: 'fa-solid fa-building-shield', category: ['solid', 'building', 'shield', ]}, 
  {value: 'fa-solid fa-building-un', category: ['solid', 'building', 'un', ]}, 
  {value: 'fa-solid fa-building-user', category: ['solid', 'building', 'user', ]}, 
  {value: 'fa-solid fa-building-wheat', category: ['solid', 'building', 'wheat', ]}, 
  {value: 'fa-solid fa-burst', category: ['solid', 'burst', ]}, 
  {value: 'fa-solid fa-cable-car', category: ['solid', 'cable', 'car', ]}, 
  {value: 'fa-solid fa-car-burst', category: ['solid', 'car', 'burst', ]}, 
  {value: 'fa-solid fa-car-tunnel', category: ['solid', 'car', 'tunnel', ]}, 
  {value: 'fa-solid fa-chart-simple', category: ['solid', 'chart', 'simple', ]}, 
  {value: 'fa-solid fa-child-combatant', category: ['solid', 'child', 'combatant', ]}, 
  {value: 'fa-solid fa-children', category: ['solid', 'children', ]}, 
  {value: 'fa-solid fa-circle-nodes', category: ['solid', 'circle', 'nodes', ]}, 
  {value: 'fa-solid fa-clipboard-question', category: ['solid', 'clipboard', 'question', ]}, 
  {value: 'fa-solid fa-clipboard-user', category: ['solid', 'clipboard', 'user', ]}, 
  {value: 'fa-solid fa-cloud-bolt', category: ['solid', 'cloud', 'bolt', ]}, 
  {value: 'fa-solid fa-cloud-showers-water', category: ['solid', 'cloud', 'showers', 'water', ]}, 
  {value: 'fa-solid fa-computer', category: ['solid', 'computer', ]}, 
  {value: 'fa-solid fa-cow', category: ['solid', 'cow', ]}, 
  {value: 'fa-solid fa-cubes-stacked', category: ['solid', 'cubes', 'stacked', ]}, 
  {value: 'fa-solid fa-display', category: ['solid', 'display', ]}, 
  {value: 'fa-solid fa-envelope-circle-check', category: ['solid', 'envelope', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-explosion', category: ['solid', 'explosion', ]}, 
  {value: 'fa-solid fa-faucet-drip', category: ['solid', 'faucet', 'drip', ]}, 
  {value: 'fa-solid fa-ferry', category: ['solid', 'ferry', ]}, 
  {value: 'fa-solid fa-file-circle-check', category: ['solid', 'file', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-file-circle-exclamation', category: ['solid', 'file', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-file-circle-minus', category: ['solid', 'file', 'circle', 'minus', ]}, 
  {value: 'fa-solid fa-file-circle-plus', category: ['solid', 'file', 'circle', 'plus', ]}, 
  {value: 'fa-solid fa-file-circle-question', category: ['solid', 'file', 'circle', 'question', ]}, 
  {value: 'fa-solid fa-file-circle-xmark', category: ['solid', 'file', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-file-pen', category: ['solid', 'file', 'pen', ]}, 
  {value: 'fa-solid fa-file-shield', category: ['solid', 'file', 'shield', ]}, 
  {value: 'fa-solid fa-fire-burner', category: ['solid', 'fire', 'burner', ]}, 
  {value: 'fa-solid fa-fish-fins', category: ['solid', 'fish', 'fins', ]}, 
  {value: 'fa-solid fa-flask-vial', category: ['solid', 'flask', 'vial', ]}, 
  {value: 'fa-solid fa-folder-closed', category: ['solid', 'folder', 'closed', ]}, 
  {value: 'fa-solid fa-glass-water-droplet', category: ['solid', 'glass', 'water', 'droplet', ]}, 
  {value: 'fa-solid fa-glass-water', category: ['solid', 'glass', 'water', ]}, 
  {value: 'fa-solid fa-group-arrows-rotate', category: ['solid', 'group', 'arrows', 'rotate', ]}, 
  {value: 'fa-solid fa-hand-holding-hand', category: ['solid', 'hand', 'holding', 'hand', ]}, 
  {value: 'fa-solid fa-handcuffs', category: ['solid', 'handcuffs', ]}, 
  {value: 'fa-solid fa-hands-bound', category: ['solid', 'hands', 'bound', ]}, 
  {value: 'fa-solid fa-hands-holding-child', category: ['solid', 'hands', 'holding', 'child', ]}, 
  {value: 'fa-solid fa-hands-holding-circle', category: ['solid', 'hands', 'holding', 'circle', ]}, 
  {value: 'fa-solid fa-handshake-simple', category: ['solid', 'handshake', 'simple', ]}, 
  {value: 'fa-solid fa-heart-circle-bolt', category: ['solid', 'heart', 'circle', 'bolt', ]}, 
  {value: 'fa-solid fa-heart-circle-check', category: ['solid', 'heart', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-heart-circle-exclamation', category: ['solid', 'heart', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-heart-circle-minus', category: ['solid', 'heart', 'circle', 'minus', ]}, 
  {value: 'fa-solid fa-heart-circle-plus', category: ['solid', 'heart', 'circle', 'plus', ]}, 
  {value: 'fa-solid fa-heart-circle-xmark', category: ['solid', 'heart', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-helicopter-symbol', category: ['solid', 'helicopter', 'symbol', ]}, 
  {value: 'fa-solid fa-helmet-un', category: ['solid', 'helmet', 'un', ]}, 
  {value: 'fa-solid fa-hill-avalanche', category: ['solid', 'hill', 'avalanche', ]}, 
  {value: 'fa-solid fa-hill-rockslide', category: ['solid', 'hill', 'rockslide', ]}, 
  {value: 'fa-solid fa-house-circle-check', category: ['solid', 'house', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-house-circle-exclamation', category: ['solid', 'house', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-house-circle-xmark', category: ['solid', 'house', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-house-fire', category: ['solid', 'house', 'fire', ]}, 
  {value: 'fa-solid fa-house-flag', category: ['solid', 'house', 'flag', ]}, 
  {value: 'fa-solid fa-house-flood-water-circle-arrow-right', category: ['solid', 'house', 'flood', 'water', 'circle', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-house-flood-water', category: ['solid', 'house', 'flood', 'water', ]}, 
  {value: 'fa-solid fa-house-lock', category: ['solid', 'house', 'lock', ]}, 
  {value: 'fa-solid fa-house-medical-circle-check', category: ['solid', 'house', 'medical', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-house-medical-circle-exclamation', category: ['solid', 'house', 'medical', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-house-medical-circle-xmark', category: ['solid', 'house', 'medical', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-house-medical-flag', category: ['solid', 'house', 'medical', 'flag', ]}, 
  {value: 'fa-solid fa-house-signal', category: ['solid', 'house', 'signal', ]}, 
  {value: 'fa-solid fa-house-tsunami', category: ['solid', 'house', 'tsunami', ]}, 
  {value: 'fa-solid fa-hurricane', category: ['solid', 'hurricane', ]}, 
  {value: 'fa-solid fa-jar-wheat', category: ['solid', 'jar', 'wheat', ]}, 
  {value: 'fa-solid fa-jar', category: ['solid', 'jar', ]}, 
  {value: 'fa-solid fa-jet-fighter-up', category: ['solid', 'jet', 'fighter', 'up', ]}, 
  {value: 'fa-solid fa-jug-detergent', category: ['solid', 'jug', 'detergent', ]}, 
  {value: 'fa-solid fa-kitchen-set', category: ['solid', 'kitchen', 'set', ]}, 
  {value: 'fa-solid fa-landmark-dome', category: ['solid', 'landmark', 'dome', ]}, 
  {value: 'fa-solid fa-landmark-flag', category: ['solid', 'landmark', 'flag', ]}, 
  {value: 'fa-solid fa-laptop-file', category: ['solid', 'laptop', 'file', ]}, 
  {value: 'fa-solid fa-lines-leaning', category: ['solid', 'lines', 'leaning', ]}, 
  {value: 'fa-solid fa-location-pin-lock', category: ['solid', 'location', 'pin', 'lock', ]}, 
  {value: 'fa-solid fa-locust', category: ['solid', 'locust', ]}, 
  {value: 'fa-solid fa-magnifying-glass-arrow-right', category: ['solid', 'magnifying', 'glass', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-magnifying-glass-chart', category: ['solid', 'magnifying', 'glass', 'chart', ]}, 
  {value: 'fa-solid fa-mars-and-venus-burst', category: ['solid', 'mars', 'and', 'venus', 'burst', ]}, 
  {value: 'fa-solid fa-mask-ventilator', category: ['solid', 'mask', 'ventilator', ]}, 
  {value: 'fa-solid fa-mattress-pillow', category: ['solid', 'mattress', 'pillow', ]}, 
  {value: 'fa-solid fa-mobile-retro', category: ['solid', 'mobile', 'retro', ]}, 
  {value: 'fa-solid fa-mobile-screen', category: ['solid', 'mobile', 'screen', ]}, 
  {value: 'fa-solid fa-money-bill-transfer', category: ['solid', 'money', 'bill', 'transfer', ]}, 
  {value: 'fa-solid fa-money-bill-trend-up', category: ['solid', 'money', 'bill', 'trend', 'up', ]}, 
  {value: 'fa-solid fa-money-bill-wheat', category: ['solid', 'money', 'bill', 'wheat', ]}, 
  {value: 'fa-solid fa-money-bills', category: ['solid', 'money', 'bills', ]}, 
  {value: 'fa-solid fa-mosquito-net', category: ['solid', 'mosquito', 'net', ]}, 
  {value: 'fa-solid fa-mosquito', category: ['solid', 'mosquito', ]}, 
  {value: 'fa-solid fa-mound', category: ['solid', 'mound', ]}, 
  {value: 'fa-solid fa-mountain-city', category: ['solid', 'mountain', 'city', ]}, 
  {value: 'fa-solid fa-mountain-sun', category: ['solid', 'mountain', 'sun', ]}, 
  {value: 'fa-solid fa-notdef', category: ['solid', 'notdef', ]}, 
  {value: 'fa-solid fa-people-group', category: ['solid', 'people', 'group', ]}, 
  {value: 'fa-solid fa-people-line', category: ['solid', 'people', 'line', ]}, 
  {value: 'fa-solid fa-people-pulling', category: ['solid', 'people', 'pulling', ]}, 
  {value: 'fa-solid fa-people-robbery', category: ['solid', 'people', 'robbery', ]}, 
  {value: 'fa-solid fa-people-roof', category: ['solid', 'people', 'roof', ]}, 
  {value: 'fa-solid fa-person-arrow-down-to-line', category: ['solid', 'person', 'arrow', 'down', 'to', 'line', ]}, 
  {value: 'fa-solid fa-person-arrow-up-from-line', category: ['solid', 'person', 'arrow', 'up', 'from', 'line', ]}, 
  {value: 'fa-solid fa-person-breastfeeding', category: ['solid', 'person', 'breastfeeding', ]}, 
  {value: 'fa-solid fa-person-burst', category: ['solid', 'person', 'burst', ]}, 
  {value: 'fa-solid fa-person-cane', category: ['solid', 'person', 'cane', ]}, 
  {value: 'fa-solid fa-person-chalkboard', category: ['solid', 'person', 'chalkboard', ]}, 
  {value: 'fa-solid fa-person-circle-check', category: ['solid', 'person', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-person-circle-exclamation', category: ['solid', 'person', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-person-circle-minus', category: ['solid', 'person', 'circle', 'minus', ]}, 
  {value: 'fa-solid fa-person-circle-plus', category: ['solid', 'person', 'circle', 'plus', ]}, 
  {value: 'fa-solid fa-person-circle-question', category: ['solid', 'person', 'circle', 'question', ]}, 
  {value: 'fa-solid fa-person-circle-xmark', category: ['solid', 'person', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-person-digging', category: ['solid', 'person', 'digging', ]}, 
  {value: 'fa-solid fa-person-dress-burst', category: ['solid', 'person', 'dress', 'burst', ]}, 
  {value: 'fa-solid fa-person-drowning', category: ['solid', 'person', 'drowning', ]}, 
  {value: 'fa-solid fa-person-falling-burst', category: ['solid', 'person', 'falling', 'burst', ]}, 
  {value: 'fa-solid fa-person-falling', category: ['solid', 'person', 'falling', ]}, 
  {value: 'fa-solid fa-person-half-dress', category: ['solid', 'person', 'half', 'dress', ]}, 
  {value: 'fa-solid fa-person-harassing', category: ['solid', 'person', 'harassing', ]}, 
  {value: 'fa-solid fa-person-military-pointing', category: ['solid', 'person', 'military', 'pointing', ]}, 
  {value: 'fa-solid fa-person-military-rifle', category: ['solid', 'person', 'military', 'rifle', ]}, 
  {value: 'fa-solid fa-person-military-to-person', category: ['solid', 'person', 'military', 'to', 'person', ]}, 
  {value: 'fa-solid fa-person-pregnant', category: ['solid', 'person', 'pregnant', ]}, 
  {value: 'fa-solid fa-person-rays', category: ['solid', 'person', 'rays', ]}, 
  {value: 'fa-solid fa-person-rifle', category: ['solid', 'person', 'rifle', ]}, 
  {value: 'fa-solid fa-person-shelter', category: ['solid', 'person', 'shelter', ]}, 
  {value: 'fa-solid fa-person-through-window', category: ['solid', 'person', 'through', 'window', ]}, 
  {value: 'fa-solid fa-person-walking-arrow-loop-left', category: ['solid', 'person', 'walking', 'arrow', 'loop', 'left', ]}, 
  {value: 'fa-solid fa-person-walking-arrow-right', category: ['solid', 'person', 'walking', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-person-walking-dashed-line-arrow-right', category: ['solid', 'person', 'walking', 'dashed', 'line', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-person-walking-luggage', category: ['solid', 'person', 'walking', 'luggage', ]}, 
  {value: 'fa-solid fa-plane-circle-check', category: ['solid', 'plane', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-plane-circle-exclamation', category: ['solid', 'plane', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-plane-circle-xmark', category: ['solid', 'plane', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-plane-lock', category: ['solid', 'plane', 'lock', ]}, 
  {value: 'fa-solid fa-plane-up', category: ['solid', 'plane', 'up', ]}, 
  {value: 'fa-solid fa-plant-wilt', category: ['solid', 'plant', 'wilt', ]}, 
  {value: 'fa-solid fa-plate-wheat', category: ['solid', 'plate', 'wheat', ]}, 
  {value: 'fa-solid fa-plug-circle-bolt', category: ['solid', 'plug', 'circle', 'bolt', ]}, 
  {value: 'fa-solid fa-plug-circle-check', category: ['solid', 'plug', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-plug-circle-exclamation', category: ['solid', 'plug', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-plug-circle-minus', category: ['solid', 'plug', 'circle', 'minus', ]}, 
  {value: 'fa-solid fa-plug-circle-plus', category: ['solid', 'plug', 'circle', 'plus', ]}, 
  {value: 'fa-solid fa-plug-circle-xmark', category: ['solid', 'plug', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-radio', category: ['solid', 'radio', ]}, 
  {value: 'fa-solid fa-ranking-star', category: ['solid', 'ranking', 'star', ]}, 
  {value: 'fa-solid fa-road-barrier', category: ['solid', 'road', 'barrier', ]}, 
  {value: 'fa-solid fa-road-bridge', category: ['solid', 'road', 'bridge', ]}, 
  {value: 'fa-solid fa-road-circle-check', category: ['solid', 'road', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-road-circle-exclamation', category: ['solid', 'road', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-road-circle-xmark', category: ['solid', 'road', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-road-lock', category: ['solid', 'road', 'lock', ]}, 
  {value: 'fa-solid fa-road-spikes', category: ['solid', 'road', 'spikes', ]}, 
  {value: 'fa-solid fa-rug', category: ['solid', 'rug', ]}, 
  {value: 'fa-solid fa-sack-dollar', category: ['solid', 'sack', 'dollar', ]}, 
  {value: 'fa-solid fa-sack-xmark', category: ['solid', 'sack', 'xmark', ]}, 
  {value: 'fa-solid fa-school-circle-check', category: ['solid', 'school', 'circle', 'check', ]}, 
  {value: 'fa-solid fa-school-circle-exclamation', category: ['solid', 'school', 'circle', 'exclamation', ]}, 
  {value: 'fa-solid fa-school-circle-xmark', category: ['solid', 'school', 'circle', 'xmark', ]}, 
  {value: 'fa-solid fa-school-flag', category: ['solid', 'school', 'flag', ]}, 
  {value: 'fa-solid fa-school-lock', category: ['solid', 'school', 'lock', ]}, 
  {value: 'fa-solid fa-sheet-plastic', category: ['solid', 'sheet', 'plastic', ]}, 
  {value: 'fa-solid fa-shield-cat', category: ['solid', 'shield', 'cat', ]}, 
  {value: 'fa-solid fa-shield-dog', category: ['solid', 'shield', 'dog', ]}, 
  {value: 'fa-solid fa-shield-halved', category: ['solid', 'shield', 'halved', ]}, 
  {value: 'fa-solid fa-shield-heart', category: ['solid', 'shield', 'heart', ]}, 
  {value: 'fa-solid fa-shop-lock', category: ['solid', 'shop', 'lock', ]}, 
  {value: 'fa-solid fa-square-nfi', category: ['solid', 'square', 'nfi', ]}, 
  {value: 'fa-solid fa-square-person-confined', category: ['solid', 'square', 'person', 'confined', ]}, 
  {value: 'fa-solid fa-square-virus', category: ['solid', 'square', 'virus', ]}, 
  {value: 'fa-solid fa-staff-snake', category: ['solid', 'staff', 'snake', ]}, 
  {value: 'fa-solid fa-sun-plant-wilt', category: ['solid', 'sun', 'plant', 'wilt', ]}, 
  {value: 'fa-solid fa-tarp-droplet', category: ['solid', 'tarp', 'droplet', ]}, 
  {value: 'fa-solid fa-tarp', category: ['solid', 'tarp', ]}, 
  {value: 'fa-solid fa-temperature-arrow-down', category: ['solid', 'temperature', 'arrow', 'down', ]}, 
  {value: 'fa-solid fa-temperature-arrow-up', category: ['solid', 'temperature', 'arrow', 'up', ]}, 
  {value: 'fa-solid fa-tent-arrow-down-to-line', category: ['solid', 'tent', 'arrow', 'down', 'to', 'line', ]}, 
  {value: 'fa-solid fa-tent-arrow-left-right', category: ['solid', 'tent', 'arrow', 'left', 'right', ]}, 
  {value: 'fa-solid fa-tent-arrow-turn-left', category: ['solid', 'tent', 'arrow', 'turn', 'left', ]}, 
  {value: 'fa-solid fa-tent-arrows-down', category: ['solid', 'tent', 'arrows', 'down', ]}, 
  {value: 'fa-solid fa-tent', category: ['solid', 'tent', ]}, 
  {value: 'fa-solid fa-tents', category: ['solid', 'tents', ]}, 
  {value: 'fa-solid fa-toilet-portable', category: ['solid', 'toilet', 'portable', ]}, 
  {value: 'fa-solid fa-toilets-portable', category: ['solid', 'toilets', 'portable', ]}, 
  {value: 'fa-solid fa-tornado', category: ['solid', 'tornado', ]}, 
  {value: 'fa-solid fa-tower-cell', category: ['solid', 'tower', 'cell', ]}, 
  {value: 'fa-solid fa-tree-city', category: ['solid', 'tree', 'city', ]}, 
  {value: 'fa-solid fa-trowel-bricks', category: ['solid', 'trowel', 'bricks', ]}, 
  {value: 'fa-solid fa-trowel', category: ['solid', 'trowel', ]}, 
  {value: 'fa-solid fa-truck-arrow-right', category: ['solid', 'truck', 'arrow', 'right', ]}, 
  {value: 'fa-solid fa-truck-droplet', category: ['solid', 'truck', 'droplet', ]}, 
  {value: 'fa-solid fa-truck-field-un', category: ['solid', 'truck', 'field', 'un', ]}, 
  {value: 'fa-solid fa-truck-field', category: ['solid', 'truck', 'field', ]}, 
  {value: 'fa-solid fa-truck-front', category: ['solid', 'truck', 'front', ]}, 
  {value: 'fa-solid fa-truck-plane', category: ['solid', 'truck', 'plane', ]},
];

//----------//
// function checkClass() {
//   const iconList = [];
//   let iconListP = '';
//   const icons = document.querySelectorAll('.icon-item');
//   icons.forEach(element => {
//     const icon = element.querySelector('i');
//     const iconClass = icon.getAttribute('class');
//     if (!iconClass.includes('-o')) { // Tambahkan pengecekan '!iconClass.includes('-o')'
//       let catIcon = ``;
//       const iconsplit = iconClass.split(' ');
//       iconsplit.forEach(i => {
//         if (i.includes('-')) {
//           let parts = i.split('-');
//           parts.shift(); // Menghapus elemen pertama 'fa'
//           parts.forEach(part => {
//             catIcon += `'${part}', `;
//           });
//         }
//       });

//       if (catIcon.trim() !== '') { // Memastikan catIcon tidak kosong
//         const thisIcon = { value: `${iconClass}`, category: [] };
//         const thisIconP = `
//         {value: '${iconClass}', category: [${catIcon}]},`;
//         iconListP = iconListP + ' ' + thisIconP;
//         iconList.push(thisIcon);
//       }
//     }
//   });
//   console.log(iconListP)
//   console.log(iconList)
// }
// checkClass();


export const frameworkIconClass = `
<div id="lazydev-form-class-add-wrapper" class="lazydev-form-append-wrapper">
    <div id="lazydev-form-class-add-title" class="lazydev-form-append-title">
        Framework Class:
    </div>

    <div id="lazydev-form-class-add-button" class="lazydev-form-append-button">
        Add
    </div>
</div>

<div id="lazydev-form-icon-add-wrapper" class="lazydev-form-append-wrapper">
    <div id="lazydev-form-icon-add-title" class="lazydev-form-append-title">
        Icon:
    </div>

    <div id="lazydev-form-icon-add-button" class="lazydev-form-append-button">
        Add Icon
    </div>
</div>

<div id="lazydev-form-icon-position-wrapper" class="lazydev-form-append-wrapper">
    <div id="lazydev-form-icon-add-title" style="margin-top: -2%;" class="lazydev-form-append-title">
        Icon position:
    </div>

    <select id="lazydev-form-position-select">
      <option value=""></option>
      <option value="start">start</option>
      <option value="end">end</option>
    </select>
</div>

`;

export function LazydevFieldConstructor(objectData){
  let parent = 'div';
  let dataAttributeParent = '';
  let dataChild = '';
  objectData.forEach(data => {
  if(data.parent === true){
    parent = data.tagName;
    if(data.inputid && data.inputid !== ''){
      dataAttributeParent += `id="${data.inputid}"`;
    }
    if(data.style && data.style !== ''){
      let dataStyle = ` style="${data.style}"`;
      dataAttributeParent += dataStyle;
    }
  }
  if(data.tagName === 'label'){
    const newchild = standardLabel(data);
    dataChild+= newchild;
  }
  if(data.tagName === 'input'){
    const newchild = standardinputfield(data);
    dataChild+= newchild;
  }
  if(data.tagName === 'select'){
    const newchild = standardSelect(data);
    dataChild+= newchild;
  }


});
//-------------------------------------------------//
function standardLabel(object){
let result = '';
if(!object.classArr){
let labelID = '';
if(object.inputid && object.inputid !== ''){
  labelID = `id="${object.inputid}"`;
}
let labelStyle = ``;
if(object.style && object.style !== ''){
  labelStyle = `style="${object.style}"`;
}
let text = 'label';
if(object.text){
  text = `${object.text}`;
}
let label = `\n <label ${labelID} ${labelStyle}>${text}</label>`;
result += label;
}
if(object.classArr){
  object.classArr.forEach(element => {
let labelID = '';
if(object.inputid && object.inputid !== ''){
  labelID = `id="${object.inputid}-${element}"`;
}
let labelClass = '';
if(element !== ''){
  labelClass = `${element}-mode`;
}
let labelStyle = ``;
if(object.style && object.style !== ''){
  labelStyle = `style="${object.style}"`;
}
let text = 'label';
if(object.text){
  text = `${object.text}`;
}
let label = `\n <label ${labelID} ${labelClass} ${labelStyle}>${text}</label>`;
result += label;
  });
}
return result;
}
//-------------------------------------------------//
function standardinputfield(object){
  let result = ``;
  const classArr = object.classArr;
  classArr.forEach(element => {
    let inputtype = `type="${object.type}"`;
    let componentID = `${object.inputid}-${element}`;
    if(element === 'base' || element === ''){
      componentID = `${object.inputid}`;
    }
    let componentStyle = ``;
    if(object.style){
      componentStyle =`style="${object.style}"`;
    }
    let componentAttr = '';
    if(object.inputAttr){
      componentAttr = `${object.inputAttr}`;
    }
    let componentClass = '';
    let dataAttribute = `${object.data}-${element}`;
    if(element === 'base' || element === ''){
      dataAttribute = `${object.data}`;
    }
    if(element !== ''){
      componentClass = `class="${element}-mode"`;
    }
    let component = `\n <input ${inputtype} id="${componentID}" ${componentStyle} ${componentAttr} ${componentClass}>`;
    result += component;
    const newArray = {elementID: componentID, process: 'standard-input', data: dataAttribute};
    checkAndPushfieldIDArray(newArray);
  });
  return result;
}
//-------------------------------------------------//
function standardSelect(object){
let result = '';
let optionfield = '';
object.option.forEach(option => {
  let newoption = `<option value="${option.value}">${option.name}</option>`;
  optionfield+= newoption;
});
//----------------------------------------//
object.classArr.forEach(element => {
  let componentID = `${object.inputid}`;
  if(element !== 'base' || element !== ''){
          componentID = `${object.inputid}-${element}`;
  }
  let componentClass = '';
  if(element !== ''){
    componentClass = `class="${element}-mode"`;
  }
  let componentStyle = ``;
  if(object.style){
    componentStyle =`style="${object.style}"`;
  }
  let componentAttr = '';
  if(object.inputAttr){
    componentAttr = `${object.inputAttr} `;
  }
  let dataAttribute = `${object.data}-${element}`;
  if(element === 'base' || element === ''){
    dataAttribute = `${object.data}`;
  }
//----------------------------------------//
  let newselect = `<select id="${componentID}" ${componentAttr}${componentStyle} ${componentClass}>${optionfield}</select>`;
  result += newselect;
  const newArray = {elementID: componentID, process: 'standard-select', data: dataAttribute};
    checkAndPushfieldIDArray(newArray);
  //----------------------------------------//
});
return result;
}
//-------------------------------------------------//
function checkAndPushfieldIDArray(newArray){
  const isElementIDUnique = fieldIDArray.find(item => item.elementID === newArray.elementID) === undefined;
    // Jika elementID unik, tambahkan ke fieldIDArray
    if (isElementIDUnique) {
    fieldIDArray.push(newArray);
  } else {
  // console.log("ElementID is not unique, skipping addition.");
}
}
//-------------------------------------------------//
const result = `
<${parent} ${dataAttributeParent}}>
${dataChild}
</${parent}>
`;
return result;
};

function createoptionObject(ask){
  const standardoption = [
    {name: ' ', value: ''},
    {name: '%', value: '%'},
    {name: 'px', value: 'px'},
    {name: 'em', value: 'em'},
    {name: 'vw', value: 'vw'},
    {name: 'vh', value: 'vh'},
  ];
  const alloptions = [
    {name: ' ', value: ''},
    {name: '%', value: '%'},
    {name: 'px', value: 'px'},
    {name: 'em', value: 'em'},
    {name: 'rem', value: 'rem'},
    {name: 'vw', value: 'vw'},
    {name: 'vh', value: 'vh'},
    {name: 'dvw', value: 'dvw'},
    {name: 'dvh', value: 'dvh'},
    {name: 'svw', value: 'svw'},
    {name: 'svh', value: 'svh'},
    {name: 'svh', value: 'svh'},
  ];
  const boxSizing = [
    {name: ' ', value: ''},
    {name: 'border-box', value: 'border-box'},
    {name: 'content-box', value: 'content-box'},
  ]
  if(ask === 'standard-option'){
    return standardoption;
  }
  if(ask === 'box-sizing'){
    return boxSizing;
  }
}

export function createClassObject(ask){
const allclass = ['base','hover','active','tablet','mobile',];
const alldevice = ['base','tablet','mobile',];
const noclass = [''];
const base = ['base'];
const baseHover = ['base','hover'];
if(ask === 'all'|| ask === 'allclass'){
  return allclass;
}
if(ask === 'alldevice'){
  return alldevice;
}
if(ask === ''){
  return noclass;
}
if(ask === 'base'){
  return base;
}
if(ask === 'basehover'){
  return baseHover;
}
}

function createFormStyle(width,other){
let style = '';
if(width && width !== ''){
  style += `width: ${width}% !important;`;
}
let otherParam = '';
if(other && other !== ''){
  style += ` ${other}`;
}
let result = style;
return result;
}
export function createObjectForm(array,ask,object,askclass){
  let result;
  let classres = [''];
  if(askclass){
    classres = createClassObject(askclass);
  }
  if(ask === 'standard-parent'){
    result = {parent: true, tagName: 'div', style:'width: 100%;'};
    array.push(result);
  }
  if(ask === 'standard-parent-with-id'){
    result = {parent: true, tagName: 'div', inputid:`${object}`, style:'width: 100%;'};
    array.push(result);
  }
  if(ask === 'standard-label'){
    result = {tagName: 'label', text: `${object.text}`, inputid:`${object.id}-label`,style: `${object.style}`},
    array.push(result);
  }
  if(ask === 'standard-input-number'){
    result = {tagName: 'input', type:'number', inputAttr:`${object.attr}`, 
    inputid: `${object.id}-input`, classArr: classres,style: `${object.style}`, data:`${object.data}`},
    array.push(result);
  }
  }

export function createSelectObject(array,askoption,askclass,askID,objectStyle,dataParam){

  let optionarray = createoptionObject(askoption);
  let classarray = createClassObject(askclass);
  let result = {tagName: 'select',option: optionarray, inputid:`${askID}-select`, classArr: classarray, style: objectStyle,data:dataParam};
  array.push(result);
}

const editFormflexbasisFUNC = ()=>{
const newfield = [];
const objectID = 'flex-basis-edit'
const labelStyle = createFormStyle('36');
const selectStyle = createFormStyle('30');
createObjectForm(newfield,'standard-parent-with-id',objectID);
createObjectForm(newfield,'standard-label',{text: 'Flex-basis :', id:`${objectID}`,style:labelStyle});
createObjectForm(newfield,'standard-input-number',
{id:`${objectID}`,attr: 'max="100" value="" step="1" min=""',style:selectStyle, data: 'data-flex-basis'},'allclass');
createSelectObject(newfield,'standard-option','allclass',objectID,selectStyle,'data-flex-basis-parameter');
const result = LazydevFieldConstructor(newfield);
return result;
}

export const editFormflexbasis = editFormflexbasisFUNC();

const editFormBoxSizingFUNC = ()=>{
  const newfield = [];
  const objectID = 'box-sizing-edit'
  const labelStyle = createFormStyle('50');
  const selectStyle = createFormStyle('45');
  createObjectForm(newfield,'standard-parent-with-id',objectID);
  createObjectForm(newfield,'standard-label',{text: 'Box-sizing :', id:`${objectID}`,style:labelStyle});
  createSelectObject(newfield,'box-sizing','',objectID,selectStyle,'data-box-sizing');
  const result = LazydevFieldConstructor(newfield);
  // console.log(result)
  return result;
}

export const editFormBoxSizing = editFormBoxSizingFUNC();

const editFormflexGapFUNC =()=>{
const newfield = [];
const objectID = 'flex-gap-edit'
const labelStyle = createFormStyle('36');
const selectStyle = createFormStyle('30');
createObjectForm(newfield,'standard-parent-with-id',objectID);
createObjectForm(newfield,'standard-label',{text: 'Flex-gap :', id:`${objectID}`,style:labelStyle});
createObjectForm(newfield,'standard-input-number',
{id:`${objectID}`,attr: 'max="100" value="" step="1" min="0"',style:selectStyle, data: 'data-flex-gap'},'allclass');
createSelectObject(newfield,'standard-option','allclass',objectID,selectStyle,'data-flex-gap-parameter');
const result = LazydevFieldConstructor(newfield);
return result;
}
export const editFormflexGap = editFormflexGapFUNC();

const legendeditElement =`<legend data-id="formlegend" id="formmakerlegendFormEditElement" class="formmakerlegendFormEditElement">
Form Edit Element</legend>`
;
export { legendeditElement };
//==========================
const editDisplay = `<div id="editDisplay" inputid="inputid3" style="width: 100% !important;">
<label id="editDisplaylabel" for="NewFIeld3" labelid="label3" style="width: 45% !important;">
Display : </label>
<select fieldid="field3" id="editDisplayinput" class="base-mode" name="NewFIeld3" style="width: 50% !important;">
<option value="">
</option>
<option value="flex">
flex</option>
<option value="inline-flex">
inline-flex</option>
<option value="inline">
inline</option>
<option value="block">
block</option>
<option value="inline-block">
inline-block</option>
<option value="none">
none</option>
<option value="grid">
grid</option>
<option value="table">
table</option>
</select>

<select fieldid="field3" id="editDisplayinput-hover"  class="hover-mode" name="NewFIeld3" style="width: 50% !important;">
<option value="">
</option>
<option value="flex">
flex</option>
<option value="inline-flex">
inline-flex</option>
<option value="inline">
inline</option>
<option value="block">
block</option>
<option value="inline-block">
inline-block</option>
<option value="none">
none</option>
<option value="grid">
grid</option>
<option value="table">
table</option>
</select>

<select fieldid="field3" id="editDisplayinput-active"  class="active-mode" name="NewFIeld3" style="width: 50% !important;">
<option value="">
</option>
<option value="flex">
flex</option>
<option value="inline-flex">
inline-flex</option>
<option value="inline">
inline</option>
<option value="block">
block</option>
<option value="inline-block">
inline-block</option>
<option value="none">
none</option>
<option value="grid">
grid</option>
<option value="table">
table</option>
</select>

<select fieldid="field3" id="editDisplayinput-tablet" class="tablet-mode" name="NewFIeld3" style="width: 50% !important;">
<option value="">
</option>
<option value="flex">
flex</option>
<option value="inline-flex">
inline-flex</option>
<option value="inline">
inline</option>
<option value="block">
block</option>
<option value="inline-block">
inline-block</option>
<option value="none">
none</option>
<option value="grid">
grid</option>
<option value="table">
table</option>
</select>


<select fieldid="field3" id="editDisplayinput-mobile" class="mobile-mode" name="NewFIeld3" style="width: 50% !important;">
<option value="">
</option>
<option value="flex">
flex</option>
<option value="inline-flex">
inline-flex</option>
<option value="inline">
inline</option>
<option value="block">
block</option>
<option value="inline-block">
inline-block</option>
<option value="none">
none</option>
<option value="grid">
grid</option>
<option value="table">
table</option>
</select>
</div> 
`;
export { editDisplay };
const editFormselectflexwrap = `
<div id="selectflexwrap" inputid="inputid5" style="width: 100% !important; opacity: 1;">
<label id="selectflexwraplabel" for="NewFIeld5" labelid="label5" style="width: 45% !important;">
flex-wrap : </label>
<select fieldid="field5" id="selectflexwrapinput" name="NewFIeld5" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="wrap">
wrap</option>
<option value="nowrap">
nowrap</option>
<option value="wrap-reverse">
wrap-reverse</option>
</select>

<select fieldid="field5" id="selectflexwrapinput-hover" name="NewFIeld5" style="width: 50% !important;"  class="hover-mode">
<option value="">
</option>
<option value="wrap">
wrap</option>
<option value="nowrap">
nowrap</option>
<option value="wrap-reverse">
wrap-reverse</option>
</select>

<select fieldid="field5" id="selectflexwrapinput-active" name="NewFIeld5" style="width: 50% !important;"  class="active-mode">
<option value="">
</option>
<option value="wrap">
wrap</option>
<option value="nowrap">
nowrap</option>
<option value="wrap-reverse">
wrap-reverse</option>
</select>

<select fieldid="field5" id="selectflexwrapinput-tablet" name="NewFIeld5" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="wrap">
wrap</option>
<option value="nowrap">
nowrap</option>
<option value="wrap-reverse">
wrap-reverse</option>
</select>

<select fieldid="field5" id="selectflexwrapinput-mobile" name="NewFIeld5" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="wrap">
wrap</option>
<option value="nowrap">
nowrap</option>
<option value="wrap-reverse">
wrap-reverse</option>
</select>

</div>
`;
export { editFormselectflexwrap };
//==========================
//=============================
const editFormflexDirection = `<div id="SelectFlexDirection" inputid="inputid2" style="width: 100% !important; opacity: 1;">
<label id="SelectFlexDirectionlabel" for="NewFIeld2" labelid="label2" style="width: 45% !important;">
flex-direction :</label>
<select fieldid="field2" id="SelectFlexDirectioninput" class="base-mode" name="NewFIeld2" style="width: 50% !important;">
<option value="">
</option>
<option value="row">
row</option>
<option value="column">
column</option>
<option value="row-reverse">
row-reverse</option>
<option value="column-reverse">
column-reverse</option>
</select>

<select fieldid="field2" id="SelectFlexDirectioninput-hover" class="hover-mode" name="NewFIeld2" style="width: 50% !important;">
<option value="">
</option>
<option value="row">
row</option>
<option value="column">
column</option>
<option value="row-reverse">
row-reverse</option>
<option value="column-reverse">
column-reverse</option>
</select>

<select fieldid="field2" id="SelectFlexDirectioninput-active" class="active-mode" name="NewFIeld2" style="width: 50% !important;">
<option value="">
</option>
<option value="row">
row</option>
<option value="column">
column</option>
<option value="row-reverse">
row-reverse</option>
<option value="column-reverse">
column-reverse</option>
</select>

<select fieldid="field2" id="SelectFlexDirectioninput-tablet" class="tablet-mode"  name="NewFIeld2" style="width: 50% !important;">
<option value="">
</option>
<option value="row">
row</option>
<option value="column">
column</option>
<option value="row-reverse">
row-reverse</option>
<option value="column-reverse">
column-reverse</option>
</select>

<select fieldid="field2" id="SelectFlexDirectioninput-mobile" class="mobile-mode"  name="NewFIeld2" style="width: 50% !important;">
<option value="">
</option>
<option value="row">
row</option>
<option value="column">
column</option>
<option value="row-reverse">
row-reverse</option>
<option value="column-reverse">
column-reverse</option>
</select>

</div>
`;
export { editFormflexDirection };
//==========================
const editFormJustifyContent =`<div id="selectustifycontent" inputid="inputid10" style="width: 100% !important; opacity: 1;">
<label id="selectustifycontentlabel" for="NewFIeld10" labelid="label10" style="width: 45% !important;">
Justify-Content :</label>
<select fieldid="field10" id="selectustifycontentinput" name="NewFIeld10" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="space-evenly">
space-evenly</option>
<option value="">
</option>
</select>

<select fieldid="field10" id="selectustifycontentinput-hover" name="NewFIeld10" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="space-evenly">
space-evenly</option>
<option value="">
</option>
</select>

<select fieldid="field10" id="selectustifycontentinput-active" name="NewFIeld10" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="space-evenly">
space-evenly</option>
<option value="">
</option>
</select>

<select fieldid="field10" id="selectustifycontentinput-tablet" name="NewFIeld10" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="space-evenly">
space-evenly</option>
<option value="">
</option>
</select>
<select fieldid="field10" id="selectustifycontentinput-mobile" name="NewFIeld10" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="space-evenly">
space-evenly</option>
<option value="">
</option>
</select>
</div>
`;
export { editFormJustifyContent };
//==========================
const AlignItems=`<div id="selectalign-items: " inputid="inputid13" style="width: 100%; opacity: 1;">
<label id="selectalign-items: label" for="NewFIeld13" labelid="label13" style="width: 45% !important;">
Align-items : </label>
<select fieldid="field13" id="select-align-items-input" name="NewFIeld13" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="baseline">
baseline</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field13" id="select-align-items-input-hover" name="NewFIeld13" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="baseline">
baseline</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field13" id="select-align-items-input-active" name="NewFIeld13" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="baseline">
baseline</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field13" id="select-align-items-input-tablet" name="NewFIeld13" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="baseline">
baseline</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>
<select fieldid="field13" id="select-align-items-input-mobile" name="NewFIeld13" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="baseline">
baseline</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>
</div>
`;
export { AlignItems };
//==========================
const editFormAlignContent =`<div id="selectalign-content: " inputid="inputid16" style="width: 100%; opacity: 1;">
<label id="selectalign-content: label" for="NewFIeld16" labelid="label16" style="width: 45% !important;">
Align-Contents : </label>
<select fieldid="field16" id="select-align-content-input" name="NewFIeld16" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field16" id="select-align-content-input-hover" name="NewFIeld16" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field16" id="select-align-content-input-active" name="NewFIeld16" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>

<select fieldid="field16" id="select-align-content-input-tablet" name="NewFIeld16" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>
<select fieldid="field16" id="select-align-content-input-mobile" name="NewFIeld16" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="flex-start">
flex-start</option>
<option value="flex-end">
flex-end</option>
<option value="center">
center</option>
<option value="space-between">
space-between</option>
<option value="space-around">
space-around</option>
<option value="stretch">
stretch</option>
<option value="">
</option>
</select>
</div>
`;
export { editFormAlignContent };
//==========================
// const editFormselectflex_order = `<div id="selectflex-order" inputid="inputid22" style="width: 100%;">
// <label id="selectflex-order" label" for="selectflex-grow" labelid="label22" style="width: 66% !important;">
// Flex-grow :</label>
// <input fieldid="field22" type="number" id="selectflex-orderinput" name="selectflex-order" max="100" value="" step="1" min="" style="width: 30% !important;" class="base-mode">

// <input fieldid="field22" type="number" id="selectflex-orderinput-tablet" name="selectflex-order" max="100" value="" step="1" min="" style="width: 30% !important;" class="tablet-mode">

// <input fieldid="field22" type="number" id="selectflex-orderinput-mobile" name="selectflex-order" max="100" value="" step="1" min="" style="width: 30% !important;" class="mobile-mode">
// </div>`;
// export { editFormselectflex_order };
//============================
const editFormflexgrow =`<paragraph inputid="inputid20" fieldid="field20" style="width: 100%; font-size: 14px; margin-left: -2%; color: rgb(184, 184, 184); opacity: 1;">
    Children Flex Element</paragraph>
<div id="selectflex-grow: " inputid="inputid22" style="width: 100%;">
<label id="selectflex-grow: label" for="selectflex-grow: " labelid="label22" style="width: 66% !important;">
Flex-grow :</label>
<input fieldid="field22" type="number" id="select-flex-grow-input" name="selectflex-grow: " max="100" value="" step="1" min="" style="width: 30% !important;" class="base-mode">
<input fieldid="field22" type="number" id="select-flex-grow-input-hover" name="selectflex-grow: " max="100" value="" step="1" min="" style="width: 30% !important;" class="hover-mode">
<input fieldid="field22" type="number" id="select-flex-grow-input-active" name="selectflex-grow: " max="100" value="" step="1" min="" style="width: 30% !important;" class="active-mode">
<input fieldid="field22" type="number" id="select-flex-grow-input-tablet" name="selectflex-grow: " max="100" value="" step="1" min="" style="width: 30% !important;" class="tablet-mode">
<input fieldid="field22" type="number" id="select-flex-grow-input-mobile" name="selectflex-grow: " max="100" value="" step="1" min="" style="width: 30% !important;" class="mobile-mode">
</div>`;
export { editFormflexgrow };
//==========================
const editFormflexOrder =`
<div id="selectflex-order: " inputid="inputid22" style="width: 100%;">
<label id="selectflex-order: label" for="selectflex-order: " labelid="label22" style="width: 66% !important;">
Flex-order :</label>
<input fieldid="field22" type="number" id="select-flex-order-input" name="selectflex-order: " max="100" value="" step="1" min="" style="width: 30% !important;" class="base-mode">
<input fieldid="field22" type="number" id="select-flex-order-input-hover" name="selectflex-order: " max="100" value="" step="1" min="" style="width: 30% !important;" class="hover-mode">
<input fieldid="field22" type="number" id="select-flex-order-input-active" name="selectflex-order: " max="100" value="" step="1" min="" style="width: 30% !important;" class="active-mode">
<input fieldid="field22" type="number" id="select-flex-order-input-tablet" name="selectflex-order: " max="100" value="" step="1" min="" style="width: 30% !important;" class="tablet-mode">
<input fieldid="field22" type="number" id="select-flex-order-input-mobile" name="selectflex-order: " max="100" value="" step="1" min="" style="width: 30% !important;" class="mobile-mode">
</div>`;
export { editFormflexOrder };
//==========================

// const editFormflexbasis=`<div id="flex-basis-edit " inputid="inputid23" style="width: 100%;">
// <label id="flex-basis-edit label" for="flex-basis-edit" labelid="label23" style="width: 36% !important;">
// Flex-basis (%)</label>
// <input fieldid="field23" type="number" id="flex-basis-edit-input" name="flex-basis-edit" style="width: 30% !important;" max="100" value="" step="1" min="" class="base-mode">
// <select style="width: 30% !important;" class="base-mode">
// <option value=""></option>
// <option value="width">Width</option>
// <option value="min-width">Min-Width</option>
// <option value="max-width">Max-Width</option>
// </select>
// <input fieldid="field23" type="number" id="flex-basis-edit-input-hover" name="flex-basis-edit" style="width: 30% !important;" max="100" value="" step="1" min="" class="hover-mode">
// <input fieldid="field23" type="number" id="flex-basis-edit-input-active" name="flex-basis-edit" style="width: 30% !important;" max="100" value="" step="1" min="" class="active-mode">
// <input fieldid="field23" type="number" id="flex-basis-edit-input-tablet" name="flex-basis-edit" style="width: 30% !important;" max="100" value="" step="1" min="" class="tablet-mode">
// <input fieldid="field23" type="number" id="flex-basis-edit-input-mobile" name="flex-basis-edit" style="width: 30% !important;" max="100" value="" step="1" min="" class="mobile-mode">
// </div>`;
// export { editFormflexbasis };
//==========================
const editFormflexShrink=`<div id="flex-shrink-edit " inputid="inputid24" style="width: 100%;">
<label id="flex-shrink-edit label" for="flex-shrink-edit" labelid="label24" style="width: 66% !important;">
Flex-Shrink : </label>
<input fieldid="field24" type="number" min="0" id="flex-shrink-edit-input" name="flex-shrink-edit" style="width: 30% !important;" class="base-mode">
<input fieldid="field24" type="number" min="0" id="flex-shrink-edit-input-hover" name="flex-shrink-edit" style="width: 30% !important;" class="hover-mode">
<input fieldid="field24" type="number" min="0" id="flex-shrink-edit-input-active" name="flex-shrink-edit" style="width: 30% !important;" class="active-mode">
<input fieldid="field24" type="number" min="0" id="flex-shrink-edit-input-tablet" name="flex-shrink-edit" style="width: 30% !important;" class="tablet-mode">
<input fieldid="field24" type="number" min="0" id="flex-shrink-edit-input-mobile" name="flex-shrink-edit" style="width: 30% !important;" class="mobile-mode">
</div>
<hr inputid="inputid26" fieldid="field26" style="border-top: 1px solid rgba(255, 255, 255, 0.34); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormflexShrink };
//==========================
const editFormwidth=`
<div style="width: 100% !important;">
<label style="width: 50% !important;">Width Parameter :</label>
<select id="width-value-select" style="width: 45% !important;" class="base-mode">
<option value=""></option>
<option value="width">Width</option>
<option value="min-width">Min-Width</option>
<option value="max-width">Max-Width</option>
</select>

<select id="width-value-select-hover" style="width: 45% !important;" class="hover-mode">
<option value=""></option>
<option value="width">Width</option>
<option value="min-width">Min-Width</option>
<option value="max-width">Max-Width</option>
</select>

<select id="width-value-select-active" style="width: 45% !important;" class="active-mode">
<option value=""></option>
<option value="width">Width</option>
<option value="min-width">Min-Width</option>
<option value="max-width">Max-Width</option>
</select>

<select id="width-value-select-tablet" style="width: 45% !important;" class="tablet-mode">
<option value=""></option>
<option value="width">Width</option>
<option value="min-width">Min-Width</option>
<option value="max-width">Max-Width</option>
</select>

<select id="width-value-select-mobile" style="width: 45% !important;" class="mobile-mode">
<option value=""></option>
<option value="width">Width</option>
<option value="min-width">Min-Width</option>
<option value="max-width">Max-Width</option>
</select>

</div>
<div id="selectElementWidth" inputid="inputid27" style="width: 55% !important;">
<label id="selectElementWidthlabel" for="NewFIeld27" labelid="label27" style="width: 45% !important;">
Unit :</label>
<select fieldid="field27" id="selectElementWidthinput" name="NewFIeld27" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field27" id="selectElementWidthinput-hover" name="NewFIeld27" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field27" id="selectElementWidthinput-active" name="NewFIeld27" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field27" id="selectElementWidthinput-tablet" name="NewFIeld27" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field27" id="selectElementWidthinput-mobile" name="NewFIeld27" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

</div>
<div id="WidthElementEdit" inputid="inputid28" style="width: 45% !important;">
<label id="WidthElementEditlabel" for="WidthElementEdit" labelid="label28" style="width: 0% !important;">
</label>
<input fieldid="field28" type="number" id="WidthElementEditinput" name="WidthElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="base-mode">

<input fieldid="field28" type="number" id="WidthElementEditinput-hover" name="WidthElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="hover-mode">

<input fieldid="field28" type="number" id="WidthElementEditinput-active" name="WidthElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="active-mode">

<input fieldid="field28" type="number" id="WidthElementEditinput-tablet" name="WidthElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="tablet-mode">

<input fieldid="field28" type="number" id="WidthElementEditinput-mobile" name="WidthElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="mobile-mode">

</div>
<hr inputid="inputid32" fieldid="field32" style="border-top: 1px solid rgba(255, 255, 255, 0.45); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">`;
export { editFormwidth };
//==========================
const editFormheight=`
<div style="width: 100% !important;">
<label style="width: 50% !important;">Height Parameter :</label>
<select id="height-value-select" style="width: 45% !important;" class="base-mode">
<option value=""></option>
<option value="height">height</option>
<option value="min-height">Min-height</option>
<option value="max-height">Max-height</option>
</select>

<select id="height-value-select-hover" style="width: 45% !important;" class="hover-mode">
<option value=""></option>
<option value="height">height</option>
<option value="min-height">Min-height</option>
<option value="max-height">Max-height</option>
</select>

<select id="height-value-select-active" style="width: 45% !important;" class="active-mode">
<option value=""></option>
<option value="height">height</option>
<option value="min-height">Min-height</option>
<option value="max-height">Max-height</option>
</select>

<select id="height-value-select-tablet" style="width: 45% !important;" class="tablet-mode">
<option value=""></option>
<option value="height">height</option>
<option value="min-height">Min-height</option>
<option value="max-height">Max-height</option>
</select>

<select id="height-value-select-mobile" style="width: 45% !important;" class="mobile-mode">
<option value=""></option>
<option value="height">height</option>
<option value="min-height">Min-height</option>
<option value="max-height">Max-height</option>
</select>

</div>
<div id="selectElementHeight" inputid="inputid30" style="width: 55% !important;">
<label id="selectElementHeightlabel" for="NewFIeld30" labelid="label30" style="width: 45% !important;">
Unit :</label>
<select fieldid="field30" id="selectElementHeightinput" name="NewFIeld30" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field30" id="selectElementHeightinput-hover" name="NewFIeld30" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field30" id="selectElementHeightinput-active" name="NewFIeld30" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field30" id="selectElementHeightinput-tablet" name="NewFIeld30" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field30" id="selectElementHeightinput-mobile" name="NewFIeld30" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="dvh">
dvh</option>
<option value="svh">
svh</option>
<option value="dvw">
dvw</option>
<option value="svw">
svw</option>
<option value="em">
em</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>
</div>
<div id="heightElementEdit" inputid="inputid31" style="width: 44% !important;">
<label id="heightElementEditlabel" for="heightElementEdit" labelid="label31" style="width: 0% !important;">
</label>

<input fieldid="field31" type="number" id="heightElementEditinput" name="heightElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="base-mode">

<input fieldid="field31" type="number" id="heightElementEditinput-hover" name="heightElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="hover-mode">

<input fieldid="field31" type="number" id="heightElementEditinput-active" name="heightElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="active-mode">

<input fieldid="field31" type="number" id="heightElementEditinput-tablet" name="heightElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="tablet-mode">

<input fieldid="field31" type="number" id="heightElementEditinput-mobile" name="heightElementEdit" max="" value="" step="1" min="" style="width: 100% !important;" class="mobile-mode">

</div>
<hr inputid="inputid32" fieldid="field32" style="border-top: 1px solid rgba(255, 255, 255, 0.45); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormheight };
//==========================
const editFormoverflowX=`<div id="elementoverflow-x" inputid="inputid33" style="width: 100%;">
<label id="elementoverflow-xlabel" for="NewFIeld33" labelid="label33" style="width: 45% !important;">
Overflow-X :</label>

<select fieldid="field33" id="elementoverflow-xinput" name="NewFIeld33" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field33" id="elementoverflow-xinput-hover" name="NewFIeld33" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field33" id="elementoverflow-xinput-active" name="NewFIeld33" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field33" id="elementoverflow-xinput-tablet" name="NewFIeld33" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field33" id="elementoverflow-xinput-mobile" name="NewFIeld33" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

</div>`;
export { editFormoverflowX };
//==========================
const editFormoverflowY=`<div id="Elementoverflow-y" inputid="inputid34" style="width: 100%;">
<label id="Elementoverflow-ylabel" for="NewFIeld34" labelid="label34" style="width: 45% !important;">
Overflow-Y : </label>
<select fieldid="field34" id="Elementoverflow-yinput" name="NewFIeld34" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field34" id="Elementoverflow-yinput-hover" name="NewFIeld34" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field34" id="Elementoverflow-yinput-active" name="NewFIeld34" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field34" id="Elementoverflow-yinput-tablet" name="NewFIeld34" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field34" id="Elementoverflow-yinput-mobile" name="NewFIeld34" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="scroll">
scroll</option>
<option value="visible">
visible</option>
<option value="hidden">
hidden</option>
<option value="overlay">
overlay</option>
<option value="inherit">
inherit</option>
</select>

</div>
<hr inputid="inputid35" fieldid="field35" style="border-top: 1px solid rgba(255, 255, 255, 0.44); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormoverflowY };
//==========================
const editFormhtmlTag=`<div id="ElementHtmlTag" inputid="inputid36" style="width: 100%;" class="base-mode">
<label id="ElementHtmlTaglabel" for="NewFIeld36" labelid="label36" style="width: 45% !important;">
&lt;html tag&gt;</label>
<select fieldid="field36" id="ElementHtmlTaginput" name="NewFIeld36" style="width: 50% !important;">
<option value="">
</option>
<option value="SECTION">
Section</option>
<option value="DIV">
div</option>
<option value="HEADER">
header</option>
<option value="FOOTER">
footer</option>
<option value="MAIN">
main</option>
<option value="ARTICLE">
article</option>
<option value="FORM">
form</option>
<option value="ASIDE">
aside</option>
<option value="TABLE">
table</option>
<option value="NAV">
nav</option>
<option value="CANVAS">
canvas</option>
<option value="UL">
U List</option>
<option value="OL">
O List</option>
</select>
</div>
`;
export { editFormhtmlTag };
//==========================
const backgroundNone = `
<div id="background-none" class="checkbox-FormEditElement" style="width: 70% !important;">
<label style="width: 90% !important;"> Background none</label>

<input type="checkbox" id="background-none-input" style="width: 10% !important;" class="checkbox-FormEditElement">

</div>

`;
export {backgroundNone};
const editFormbackgroundColor=`<div id="elementBackgroundColorDiv" inputid="inputid49" style="width: 100%; opacity: 1;">
<label id="elementBackgroundColorlabel" for="elementBackgroundColor" labelid="label49" style="width: 80% !important;">
Background-color : </label>
<input fieldid="field49" type="color" value="#c512ad" id="elementBackgroundColorinput" name="elementBackgroundColor" style="width: 15% !important;" class="base-mode">

<input fieldid="field49" type="color" value="#c512ad" id="elementBackgroundColorinput-hover" name="elementBackgroundColor" style="width: 15% !important;" class="hover-mode">

<input fieldid="field49" type="color" value="#c512ad" id="elementBackgroundColorinput-active" name="elementBackgroundColor" style="width: 15% !important;" class="active-mode">

<input fieldid="field49" type="color" value="#c512ad" id="elementBackgroundColorinput-tablet" name="elementBackgroundColor" style="width: 15% !important;" class="tablet-mode">

<input fieldid="field49" type="color" value="#c512ad" id="elementBackgroundColorinput-mobile" name="elementBackgroundColor" style="width: 15% !important;" class="mobile-mode">

</div>
<div id="elementBackgroundOpacityDiv" inputid="inputid40" style="width: 100%; opacity: 1;">
<label id="elementBackgroundOpacitylabel" for="elementBackgroundOpacity" labelid="label40" style="width: 55% !important;">
Background Opacity :</label>
<input fieldid="field40" type="range" min="0" max="1" value="1" step="0.01" id="elementBackgroundOpacityinput" name="elementBackgroundOpacity" style="width: 40% !important;" class="base-mode">

<input fieldid="field40" type="range" min="0" max="1" value="1" step="0.01" id="elementBackgroundOpacityinput-hover" name="elementBackgroundOpacity" style="width: 40% !important;" class="hover-mode">

<input fieldid="field40" type="range" min="0" max="1" value="1" step="0.01" id="elementBackgroundOpacityinput-active" name="elementBackgroundOpacity" style="width: 40% !important;" class="active-mode">

<input fieldid="field40" type="range" min="0" max="1" value="1" step="0.01" id="elementBackgroundOpacityinput-tablet" name="elementBackgroundOpacity" style="width: 40% !important;" class="tablet-mode">

<input fieldid="field40" type="range" min="0" max="1" value="1" step="0.01" id="elementBackgroundOpacityinput-mobile" name="elementBackgroundOpacity" style="width: 40% !important;" class="mobile-mode">

</div>
<div id="elementBackgroundColorresultDiv">
<input fieldid="field49a" type="text" value="#c512ad" id="elementBackgroundColorresult" name="elementBackgroundColorresult" style="width: 100% !important;" readonly class="base-mode">

<input fieldid="field49a" type="text" value="#c512ad" id="elementBackgroundColorresult-hover" name="elementBackgroundColorresult-hover" style="width: 100% !important;" readonly class="hover-mode">

<input fieldid="field49a" type="text" value="#c512ad" id="elementBackgroundColorresult-active" name="elementBackgroundColorresult-active" style="width: 100% !important;" readonly class="active-mode">

<input fieldid="field49a" type="text" value="#c512ad" id="elementBackgroundColorresult-tablet" name="elementBackgroundColorresult-tablet" style="width: 100% !important;" readonly class="tablet-mode">

<input fieldid="field49a" type="text" value="#c512ad" id="elementBackgroundColorresult-mobile" name="elementBackgroundColorresult-mobile" style="width: 100% !important;" readonly class="mobile-mode">

</div>

`;
export { editFormbackgroundColor };

const editFormadvanceBackground = `<div id="advanceBackground" class="checkbox-FormEditElement" style="width: 70% !important;">
<label id="elementBorderRadiuslabel" style="width: 90% !important;"> Advance Background</label>

<input type="checkbox" id="advance-background" style="width: 10% !important;" class="checkbox-FormEditElement">

</div>

<div style="padding-left: 3%;"id="advance-mode-background-div" class="none-mode">

<div class="base-mode">
  <div id="element-bg-image" style="width: 100%">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background image</p>

    <button id="media-file-upload-bg-img" data-upload="background-url-input" class="js-media-file" style="font-size: 10px !important; width: 65%; margin-top: 5px;">Use Media File</button>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 100% !important;">Image url<span style="font-size:10px;">(From External Site) :</span></label>
      <input type="text" id="background-url-input" style="width: 100% !important;">
      <label style="width: 55% !important; padding-top: 5%;">Background size :</label>
      <select id="background-size-input" style="width: 40% !important;">
      <option value=""></option>
      <option value="auto">auto</option>
      <option value="cover">Cover</option>
      <option value="contain">Contain</option>
      <option value="50%">50%</option>
      <option value="100%">100%</option>
      </select>
      <label style="width: 55% !important; padding-top: 2%;">Repeat :</label>
      <select id="background-repeat-input" style="width: 40% !important;">
      <option value=""></option>
      <option value="repeat">repeat</option>
      <option value="no-repeat">no-repeat</option>
      <option value="repeat-x">repeat-x</option>
      <option value="repeat-y">repeat-y</option>
      </select>
      <label style="width: 55% !important;">Position(X) % :</label>
      <input type="number" id="background-position-x-input" style="width: 40% !important;">
      <label style="width: 55% !important;">Position(Y) % :</label>
      <input type="number" id="background-position-y-input" style="width: 40% !important;">
    </div>
  </div>

  <div id="element-bg-gradient">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background gradient</p>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"></label>
      <button id="clear-gradient-setting" style="width: 30% !important; font-size: 12px;">Clear</button>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 1 :</b></label>
      <input type="color" id="gradient-color-1-input" style="width: 30% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-1-input" min="0" max="1" step="0.1"  style="width: 60% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-1-number" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-1-input" style="width: 50% !important;">
    </div>

    <hr>
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 2 :</b></label>
      <input type="color" id="gradient-color-2-input" style="width: 30% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-2-input" min="0" max="1" step="0.1" style="width: 60% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-2-number" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-2-input" style="width: 50% !important;">
    </div>

    <hr>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">type :</label>
      <select id="gradient-type-input" style="width: 60% !important;">
      <option value=""></option>
        <option value="linear-gradient">Linear</option>
        <option value="radial-gradient">Radial</option>
      </select>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">Angle :</label>
      <input type="number" id="gradient-angle-number" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-angle-input" min="-100" max="100" style="width: 50% !important;">
    </div>

    <hr>

  </div>
</div>
<div class="hover-mode">
  <div id="element-bg-image" style="width: 100%">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background image</p>


    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 100% !important;">Image url<span style="font-size:10px;">(From External Site) :</span></label>
      <input type="text" id="background-url-input-hover" style="width: 100% !important;">
      <label style="width: 55% !important; padding-top: 5%;">Background size :</label>
      <select id="background-size-input-hover" style="width: 40% !important;">
      <option value=""></option>
      <option value="auto">auto</option>
      <option value="cover">Cover</option>
      <option value="contain">Contain</option>
      <option value="50%">50%</option>
      <option value="100%">100%</option>
      </select>
      <label style="width: 55% !important; padding-top: 2%;">Repeat :</label>
      <select id="background-repeat-input-hover" style="width: 40% !important;">
      <option value=""></option>
      <option value="repeat">repeat</option>
      <option value="no-repeat">no-repeat</option>
      <option value="repeat-x">repeat-x</option>
      <option value="repeat-y">repeat-y</option>
      </select>
      <label style="width: 55% !important;">Position(X) % :</label>
      <input type="number" id="background-position-x-input-hover" style="width: 40% !important;">
      <label style="width: 55% !important;">Position(Y) % :</label>
      <input type="number" id="background-position-y-input-hover" style="width: 40% !important;">
    </div>
  </div>

  <div id="element-bg-gradient">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background gradient</p>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"></label>
      <button id="clear-gradient-setting-hover" style="width: 30% !important; font-size: 12px;">Clear</button>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 1 :</b></label>
      <input type="color" id="gradient-color-1-input-hover" style="width: 30% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-1-input-hover" min="0" max="1" step="0.1"  style="width: 60% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-1-number-hover" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-1-input-hover" style="width: 50% !important;">
    </div>

    <hr>
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 2 :</b></label>
      <input type="color" id="gradient-color-2-input-hover" style="width: 30% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-2-input-hover" min="0" max="1" step="0.1" style="width: 60% !important;">
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-2-number-hover" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-2-input-hover" style="width: 50% !important;">
    </div>

    <hr>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">type :</label>
      <select id="gradient-type-input-hover" style="width: 60% !important;">
      <option value=""></option>
        <option value="linear-gradient">Linear</option>
      </select>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">Angle :</label>
      <input type="number" id="gradient-angle-number-hover" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-angle-input-hover" min="-100" max="100" style="width: 50% !important;">
    </div>

    <hr>

  </div>
</div>
<div class="active-mode">
  <div id="element-bg-image" style="width: 100%">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background image</p>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 100% !important;">Image url<span style="font-size:10px;">(From External Site) :</span></label>
      <input type="text" id="background-url-input-active" style="width: 100% !important;">
      <label style="width: 55% !important; padding-top: 5%;">Background size :</label>
      <select id="background-size-input-active" style="width: 40% !important;">
        <option value=""></option>
        <option value="auto">auto</option>
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="50%">50%</option>
        <option value="100%">100%</option>
      </select>
      <label style="width: 55% !important; padding-top: 2%;">Repeat :</label>
      <select id="background-repeat-input-active" style="width: 40% !important;">
        <option value=""></option>
        <option value="repeat">repeat</option>
        <option value="no-repeat">no-repeat</option>
        <option value="repeat-x">repeat-x</option>
        <option value="repeat-y">repeat-y</option>
      </select>
      <label style="width: 55% !important;">Position(X) % :</label>
      <input type="number" id="background-position-x-input-active" style="width: 40% !important;">
      <label style="width: 55% !important;">Position(Y) % :</label>
      <input type="number" id="background-position-y-input-active" style="width: 40% !important;">
    </div>
  </div>

  <div id="element-bg-gradient">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background gradient</p>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"></label>
      <button id="clear-gradient-setting-active" style="width: 30% !important; font-size: 12px;">Clear</button>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 1 :</b></label>
      <input type="color" id="gradient-color-1-input-active" style="width: 30% !important;">
      </div><div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-1-input-active" min="0" max="1" step="0.1"  style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-1-number-active" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-1-input-active" style="width: 50% !important;">
    </div>
    
    <hr>
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 2 :</b></label>
      <input type="color" id="gradient-color-2-input-active" style="width: 30% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-2-input-active" min="0" max="1" step="0.1" style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-2-number-active" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-2-input-active" style="width: 50% !important;">
    </div>
    
    <hr>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">type :</label>
      <select id="gradient-type-input-active" style="width: 60% !important;">
        <option value=""></option>
        <option value="linear-gradient">Linear</option>
      </select>
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">Angle :</label>
      <input type="number" id="gradient-angle-number-active" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-angle-input-active" min="-100" max="100" style="width: 50% !important;">
    </div>
    
    <hr>  
    </div>
</div>
<div class="tablet-mode">
  <div id="element-bg-image" style="width: 100%">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background image</p>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 100% !important;">Image url<span style="font-size:10px;">(From External Site) :</span></label>
      <input type="text" id="background-url-input-tablet" style="width: 100% !important;">
      <label style="width: 55% !important; padding-top: 5%;">Background size :</label>
      <select id="background-size-input-tablet" style="width: 40% !important;">
        <option value=""></option>
        <option value="auto">auto</option>
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="50%">50%</option>
        <option value="100%">100%</option>
      </select>
      <label style="width: 55% !important; padding-top: 2%;">Repeat :</label>
      <select id="background-repeat-input-tablet" style="width: 40% !important;">
        <option value=""></option>
        <option value="repeat">repeat</option>
        <option value="no-repeat">no-repeat</option>
        <option value="repeat-x">repeat-x</option>
        <option value="repeat-y">repeat-y</option>
      </select>
      <label style="width: 55% !important;">Position(X) % :</label>
      <input type="number" id="background-position-x-input-tablet" style="width: 40% !important;">
      <label style="width: 55% !important;">Position(Y) % :</label>
      <input type="number" id="background-position-y-input-tablet" style="width: 40% !important;">
    </div>
  </div>

  <div id="element-bg-gradient">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background gradient</p>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"></label>
      <button id="clear-gradient-setting-tablet" style="width: 30% !important; font-size: 12px;">Clear</button>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 1 :</b></label>
      <input type="color" id="gradient-color-1-input-tablet" style="width: 30% !important;">
      </div><div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-1-input-tablet" min="0" max="1" step="0.1"  style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-1-number-tablet" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-1-input-tablet" style="width: 50% !important;">
    </div>
    
    <hr>
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 2 :</b></label>
      <input type="color" id="gradient-color-2-input-tablet" style="width: 30% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-2-input-tablet" min="0" max="1" step="0.1" style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-2-number-tablet" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-2-input-tablet" style="width: 50% !important;">
    </div>
    
    <hr>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">type :</label>
      <select id="gradient-type-input-tablet" style="width: 60% !important;">
        <option value=""></option>
        <option value="linear-gradient">Linear</option>
      </select>
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">Angle :</label>
      <input type="number" id="gradient-angle-number-tablet" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-angle-input-tablet" min="-100" max="100" style="width: 50% !important;">
    </div>
    
    <hr>  
    </div>
</div>
<div class="mobile-mode">
  <div id="element-bg-image" style="width: 100%">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background image</p>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 100% !important;">Image url<span style="font-size:10px;">(From External Site) :</span></label>
      <input type="text" id="background-url-input-mobile" style="width: 100% !important;">
      <label style="width: 55% !important; padding-top: 5%;">Background size :</label>
      <select id="background-size-input-mobile" style="width: 40% !important;">
        <option value=""></option>
        <option value="auto">auto</option>
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="50%">50%</option>
        <option value="100%">100%</option>
      </select>
      <label style="width: 55% !important; padding-top: 2%;">Repeat :</label>
      <select id="background-repeat-input-mobile" style="width: 40% !important;">
        <option value=""></option>
        <option value="repeat">repeat</option>
        <option value="no-repeat">no-repeat</option>
        <option value="repeat-x">repeat-x</option>
        <option value="repeat-y">repeat-y</option>
      </select>
      <label style="width: 55% !important;">Position(X) % :</label>
      <input type="number" id="background-position-x-input-mobile" style="width: 40% !important;">
      <label style="width: 55% !important;">Position(Y) % :</label>
      <input type="number" id="background-position-y-input-mobile" style="width: 40% !important;">
    </div>
  </div>

  <div id="element-bg-gradient">
    <hr inputid="inputid50" fieldid="field50" style="border-top: 1px solid rgba(255, 255, 255, 0.48); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
    <p style="margin-top: -3%;">Background gradient</p>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"></label>
      <button id="clear-gradient-setting-mobile" style="width: 30% !important; font-size: 12px;">Clear</button>
    </div>

    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 1 :</b></label>
      <input type="color" id="gradient-color-1-input-mobile" style="width: 30% !important;">
      </div><div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-1-input-mobile" min="0" max="1" step="0.1"  style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-1-number-mobile" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-1-input-mobile" style="width: 50% !important;">
    </div>
    
    <hr>
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 65% !important;"><b>color 2 :</b></label>
      <input type="color" id="gradient-color-2-input-mobile" style="width: 30% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">opacity :</label>
      <input type="range" id="gradient-op-2-input-mobile" min="0" max="1" step="0.1" style="width: 60% !important;">
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">location :</label>
      <input type="number" id="gradient-location-2-number-mobile" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-location-2-input-mobile" style="width: 50% !important;">
    </div>
    
    <hr>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 35% !important;">type :</label>
      <select id="gradient-type-input-mobile" style="width: 60% !important;">
        <option value=""></option>
        <option value="linear-gradient">Linear</option>
      </select>
    </div>
    
    <div id="url-bg" style="width: 100% !important;">
      <label style="width: 25% !important;">Angle :</label>
      <input type="number" id="gradient-angle-number-mobile" style="width: 20% !important;" readonly>
      <input type="range" id="gradient-angle-input-mobile" min="-100" max="100" style="width: 50% !important;">
    </div>
    
    <hr>  
    </div>
</div>




</div>

`;
export { editFormadvanceBackground };

//==========================
const outlineProperties = `
<hr style="border-top: 1px solid rgba(255, 255, 255, 0.49); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
<div id="outlineCheck" class="checkbox-FormGeneratorMaker" data-id="checkboxInput" style="width: 100%;">
<input type="checkbox" id="outlineCheckinput" name="outline" style="width: 5%;">
<label style="width: 90%; padding-left: 5%;">
Outline</label>
</div>

<div id="outline-content">

<div id="Outline-Style" inputid="inputid3" style="width: 100%;">
<label id="Outline-Stylelabel" for="NewFIeld3" labelid="label3" style="width: 60% !important;">
Outline-Style : </label>

<select fieldid="field3" id="Outline-Styleinput" name="NewFIeld3" style="width: 35% !important;" class="base-mode">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
<option value="none">
none</option>
</select>

<select fieldid="field3" id="Outline-Styleinput-hover" name="NewFIeld3" style="width: 35% !important;" class="hover-mode">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
<option value="none">
none</option>
</select>

<select fieldid="field3" id="Outline-Styleinput-active" name="NewFIeld3" style="width: 35% !important;" class="active-mode">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
<option value="none">
none</option>
</select>

<select fieldid="field3" id="Outline-Styleinput-tablet" name="NewFIeld3" style="width: 35% !important;" class="tablet-mode">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
<option value="none">
none</option>
</select>

<select fieldid="field3" id="Outline-Styleinput-mobile" name="NewFIeld3" style="width: 35% !important;" class="mobile-mode">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
<option value="none">
none</option>
</select>



</div>

<div id="edit-Outline-Color" inputid="inputid4" style="width: 100%;">
<label id="edit-Outline-Colorlabel" for="edit-Outline-Color" labelid="label4" style="width: 60% !important;">
Outline-color :</label>

<input fieldid="field4" type="color" value="#4f4f4f" id="edit-Outline-Colorinput" name="edit-Outline-Color" style="width: 35% !important;" class="base-mode">

<input fieldid="field4" type="color" value="#4f4f4f" id="edit-Outline-Colorinput-hover" name="edit-Outline-Color" style="width: 35% !important;" class="hover-mode">

<input fieldid="field4" type="color" value="#4f4f4f" id="edit-Outline-Colorinput-active" name="edit-Outline-Color" style="width: 35% !important;" class="active-mode">

<input fieldid="field4" type="color" value="#4f4f4f" id="edit-Outline-Colorinput-tablet" name="edit-Outline-Color" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field4" type="color" value="#4f4f4f" id="edit-Outline-Colorinput-mobile" name="edit-Outline-Color" style="width: 35% !important;" class="mobile-mode">

</div>

<div id="edit-Outline-Opacity" inputid="inputid7" style="width: 100% !important;">
<label id="edit-Outline-Opacitylabel" for="edit-Outline-Opacity" labelid="label7" style="width: 60% !important;">
Outline-opacity : </label>

<input type="range" min="0" max="1" value="1" step="0.05" id="edit-Outline-Opacityinput" name="edit-Outline-Opacity" style="width: 35% !important;" class="base-mode">

<input type="range" min="0" max="1" value="1" step="0.05" id="edit-Outline-Opacityinput-hover" name="edit-Outline-Opacity" style="width: 35% !important;" class="hover-mode">

<input type="range" min="0" max="1" value="1" step="0.05" id="edit-Outline-Opacityinput-active" name="edit-Outline-Opacity" style="width: 35% !important;" class="active-mode">

<input type="range" min="0" max="1" value="1" step="0.05" id="edit-Outline-Opacityinput-tablet" name="edit-Outline-Opacity" style="width: 35% !important;" class="tablet-mode">

<input type="range" min="0" max="1" value="1" step="0.05" id="edit-Outline-Opacityinput-mobile" name="edit-Outline-Opacity" style="width: 35% !important;" class="mobile-mode">

</div>

<div id="edit-Outline-Width" inputid="inputid5" style="width: 100%;">
<label id="edit-Outline-Widthlabel" for="edit-Outline-Width" labelid="label5" style="width: 60% !important;">
Outline-width (em) : </label>

<input fieldid="field5" type="number" id="edit-Outline-Widthinput" name="edit-Outline-Width" style="width: 35% !important;" max="10" value="" step="0.025" min="0" class="base-mode">

<input fieldid="field5" type="number" id="edit-Outline-Widthinput-hover" name="edit-Outline-Width" style="width: 35% !important;" max="10" value="" step="0.025" min="0" class="hover-mode">

<input fieldid="field5" type="number" id="edit-Outline-Widthinput-active" name="edit-Outline-Width" style="width: 35% !important;" max="10" value="" step="0.025" min="0" class="active-mode">

<input fieldid="field5" type="number" id="edit-Outline-Widthinput-tablet" name="edit-Outline-Width" style="width: 35% !important;" max="10" value="" step="0.025" min="0" class="tablet-mode">

<input fieldid="field5" type="number" id="edit-Outline-Widthinput-mobile" name="edit-Outline-Width" style="width: 35% !important;" max="10" value="" step="0.025" min="0" class="mobile-mode">


</div>

<div id="edit-Outline-offset" style="width: 100%;">
<label id="edit-Outline-offsetlabel" for="edit-Outline-offset" style="width: 60% !important;">
Outline-offset(em) : </label>

<input type="number" id="edit-Outline-offsetinput" name="edit-Outline-offset" style="width: 35% !important;" max="10" value="" step="0.025" min="-10" class="base-mode">

<input type="number" id="edit-Outline-offsetinput-hover" name="edit-Outline-offset" style="width: 35% !important;" max="10" value="" step="0.025" min="-10" class="hover-mode">

<input type="number" id="edit-Outline-offsetinput-active" name="edit-Outline-offset" style="width: 35% !important;" max="10" value="" step="0.025" min="-10" class="active-mode">

<input type="number" id="edit-Outline-offsetinput-tablet" name="edit-Outline-offset" style="width: 35% !important;" max="10" value="" step="0.025" min="-10" class="tablet-mode">

<input type="number" id="edit-Outline-offsetinput-mobile" name="edit-Outline-offset" style="width: 35% !important;" max="10" value="" step="0.025" min="-10" class="mobile-mode">

</div>

</div>

`
export {outlineProperties};
//==========================

const editFormborder=`
<hr inputid="inputid54" fieldid="field54" style="border-top: 1px solid rgba(255, 255, 255, 0.49); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">

<div id="borderCheck" class="checkbox-FormGeneratorMaker" data-id="checkboxInput" style="width: 100%;">
<input type="checkbox" id="borderCheckInput" name="outline" style="width: 5%;">
<label style="width: 90%; padding-left: 5%;">
Border</label>
</div>
<div id="border-content">

<div id="elementBorderType" inputid="inputid51" style="width: 100% !important;">
<label id="elementBorderTypelabel" for="NewFIeld51" labelid="label51" style="width: 45% !important;">
Border Type :</label>
<select fieldid="field51" id="elementBorderTypeinput" name="NewFIeld51" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="none">
none</option>
<option value="solid">
solid</option>
<option value="double">
double</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="groove">
groove</option>
</select>

<select fieldid="field51" id="elementBorderTypeinput-hover" name="NewFIeld51" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="none">
none</option>
<option value="solid">
solid</option>
<option value="double">
double</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="groove">
groove</option>
</select>

<select fieldid="field51" id="elementBorderTypeinput-active" name="NewFIeld51" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="none">
none</option>
<option value="solid">
solid</option>
<option value="double">
double</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="groove">
groove</option>
</select>

<select fieldid="field51" id="elementBorderTypeinput-tablet" name="NewFIeld51" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="none">
none</option>
<option value="solid">
solid</option>
<option value="double">
double</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="groove">
groove</option>
</select>

<select fieldid="field51" id="elementBorderTypeinput-mobile" name="NewFIeld51" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="none">
none</option>
<option value="solid">
solid</option>
<option value="double">
double</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="groove">
groove</option>
</select>

</div>

<div id="elementBordercolor" inputid="inputid52" style="width: 100% !important;">
<label id="elementBordercolorlabel" for="" labelid="" style="width: 45% !important;">
Border-color :</label>
<input type="color" min="0" id="elementBorderColorinput" style="width: 50% !important;" class="base-mode">

<input type="color" min="0" id="elementBorderColorinput-hover" style="width: 50% !important;" class="hover-mode">

<input type="color" min="0" id="elementBorderColorinput-active" style="width: 50% !important;" class="active-mode">

<input type="color" min="0" id="elementBorderColorinput-tablet" style="width: 50% !important;" class="tablet-mode">

<input type="color" min="0" id="elementBorderColorinput-mobile" style="width: 50% !important;" class="mobile-mode">

</div>

<div id="edit-border-opacity" inputid="inputid8" style="width: 100%;">

<label id="edit-border-opacitylabel" for="edit-border-opacity" labelid="label8" style="width: 45% !important;">
Border-opacity : </label>

<input fieldid="field8" type="range" min="0" max="1" value="1" step="0.005" id="edit-border-opacityinput" name="edit-border-opacity" style="width: 50% !important;" class="base-mode">


<input fieldid="field8" type="range" min="0" max="1" value="1" step="0.005" id="edit-border-opacityinput-hover" name="edit-border-opacity" style="width: 50% !important;" class="hover-mode">


<input fieldid="field8" type="range" min="0" max="1" value="1" step="0.005" id="edit-border-opacityinput-active" name="edit-border-opacity" style="width: 50% !important;" class="active-mode">


<input fieldid="field8" type="range" min="0" max="1" value="1" step="0.005" id="edit-border-opacityinput-tablet" name="edit-border-opacity" style="width: 50% !important;" class="tablet-mode">


<input fieldid="field8" type="range" min="0" max="1" value="1" step="0.005" id="edit-border-opacityinput-mobile" name="edit-border-opacity" style="width: 50% !important;" class="mobile-mode">

</div>

<div id="elementBorderParams" inputid="inputid53" style="width: 100%;">
<label id="elementBorderParamslabel" for="NewFIeld53" labelid="label53" style="width: 45% !important;">
Parameter :</label>

<select fieldid="field53" id="elementBorderParamsinput" name="NewFIeld53" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field53" id="elementBorderParamsinput-hover" name="NewFIeld53" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field53" id="elementBorderParamsinput-active" name="NewFIeld53" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>


<select fieldid="field53" id="elementBorderParamsinput-tablet" name="NewFIeld53" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>


<select fieldid="field53" id="elementBorderParamsinput-mobile" name="NewFIeld53" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

</div>

<hr inputid="inputid1" fieldid="field1" style="border-top: 1px solid rgba(227, 227, 227, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">

<paragraph inputid="inputid2" fieldid="field2" style="font-size: 12px; margin-left: -2%; color: rgb(214, 209, 214);">
Border Size</paragraph>
<hr inputid="inputid3" fieldid="field3" style="border-top: 1px solid rgba(255, 255, 255, 0.38); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">

<div id="Border-input-top" inputid="inputid4" style="width: 25% !important;">
<label id="Border-input-toplabel" for="Border-input-top" labelid="label4" style="width: 100% !important;">
Top</label>

<input fieldid="field4" type="number" id="Border-input-topinput" name="Border-input-top" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="base-mode">


<input fieldid="field4" type="number" id="Border-input-topinput-hover" name="Border-input-top" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="hover-mode">


<input fieldid="field4" type="number" id="Border-input-topinput-active" name="Border-input-top" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="active-mode">


<input fieldid="field4" type="number" id="Border-input-topinput-tablet" name="Border-input-top" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="tablet-mode">


<input fieldid="field4" type="number" id="Border-input-topinput-mobile" name="Border-input-top" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="mobile-mode">

</div>

<div id="Border-input-Right" inputid="inputid5" style="width: 25% !important;">
<label id="Border-input-Rightlabel" for="Border-input-Right" labelid="label5" style="width: 100% !important;">
Right</label>
<input fieldid="field5" type="number" id="Border-input-Rightinput" name="Border-input-Right" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="base-mode">


<input fieldid="field5" type="number" id="Border-input-Rightinput-hover" name="Border-input-Right" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="hover-mode">


<input fieldid="field5" type="number" id="Border-input-Rightinput-active" name="Border-input-Right" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="active-mode">


<input fieldid="field5" type="number" id="Border-input-Rightinput-tablet" name="Border-input-Right" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="tablet-mode">


<input fieldid="field5" type="number" id="Border-input-Rightinput-mobile" name="Border-input-Right" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="mobile-mode">

</div>

<div id="Border-input-Bottom" inputid="inputid6" style="width: 25% !important;">
<label id="Border-input-Bottomlabel" for="Border-input-Bottom" labelid="label6" style="width: 100% !important;">
Bottom</label>

<input fieldid="field6" type="number" id="Border-input-Bottominput" name="Border-input-Bottom" max="" value="" step="0.25" min="0" style="width: 100% !important;" class="base-mode">


<input fieldid="field6" type="number" id="Border-input-Bottominput-hover" name="Border-input-Bottom" max="" value="" step="0.25" min="0" style="width: 100% !important;" class="hover-mode">


<input fieldid="field6" type="number" id="Border-input-Bottominput-active" name="Border-input-Bottom" max="" value="" step="0.25" min="0" style="width: 100% !important;" class="active-mode">


<input fieldid="field6" type="number" id="Border-input-Bottominput-tablet" name="Border-input-Bottom" max="" value="" step="0.25" min="0" style="width: 100% !important;" class="tablet-mode">


<input fieldid="field6" type="number" id="Border-input-Bottominput-mobile" name="Border-input-Bottom" max="" value="" step="0.25" min="0" style="width: 100% !important;" class="mobile-mode">

</div>
<div id="Border-input-left" inputid="inputid7" style="width: 25% !important;">
<label id="Border-input-leftlabel" for="Border-input-left" labelid="label7" style="width: 100% !important;">
Left</label>

<input fieldid="field7" type="number" id="Border-input-leftinput" name="Border-input-left" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="base-mode">


<input fieldid="field7" type="number" id="Border-input-leftinput-hover" name="Border-input-left" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="hover-mode">


<input fieldid="field7" type="number" id="Border-input-leftinput-active" name="Border-input-left" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="active-mode">


<input fieldid="field7" type="number" id="Border-input-leftinput-tablet" name="Border-input-left" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="tablet-mode">


<input fieldid="field7" type="number" id="Border-input-leftinput-mobile" name="Border-input-left" style="width: 100% !important;" max="" value="" step="0.25" min="0" class="mobile-mode">

</div>

</div>

<hr inputid="inputid54" fieldid="field54" style="border-top: 1px solid rgba(255, 255, 255, 0.49); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormborder };
//==========================
const editFormborderRadius=`<div id="elementBorderRadius" inputid="inputid56" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 70% !important;">
<label id="elementBorderRadiuslabel" for="Border Radius" labelid="label56" style="width: 90% !important;">
Border-radius</label>
<input fieldid="field56" type="checkbox" id="elementBorderRadiusinput" name="Border Radius" style="width: 10% !important;" class="checkbox-FormEditElement base-mode">

<input fieldid="field56" type="checkbox" id="elementBorderRadiusinput-hover" name="Border Radius" style="width: 10% !important;" class="checkbox-FormEditElement hover-mode">

<input fieldid="field56" type="checkbox" id="elementBorderRadiusinput-active" name="Border Radius" style="width: 10% !important;" class="checkbox-FormEditElement active-mode">

<input fieldid="field56" type="checkbox" id="elementBorderRadiusinput-tablet" name="Border Radius" style="width: 10% !important;" class="checkbox-FormEditElement tablet-mode">

<input fieldid="field56" type="checkbox" id="elementBorderRadiusinput-mobile" name="Border Radius" style="width: 10% !important;" class="checkbox-FormEditElement mobile-mode">

</div>

<div id="elementRadiusParam" inputid="inputid58" style="width: 30% !important;">
<label id="elementRadiusParamlabel" for="NewFIeld58" labelid="label58" style="width: 50% !important; display: none;">
Parameter</label>
<select fieldid="field58" id="elementRadiusParaminput" name="NewFIeld58" style="width: 100% !important;" class="base-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field58" id="elementRadiusParaminput-hover" name="NewFIeld58" style="width: 100% !important;" class="hover-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field58" id="elementRadiusParaminput-active" name="NewFIeld58" style="width: 100% !important;" class="active-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field58" id="elementRadiusParaminput-tablet" name="NewFIeld58" style="width: 100% !important;" class="tablet-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

<select fieldid="field58" id="elementRadiusParaminput-mobile" name="NewFIeld58" style="width: 100% !important;" class="mobile-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
</select>

</div>
<div id="elementRadiusTop" inputid="inputid57" style="width: 25% !important;">
<label id="elementRadiusToplabel" for="Radius Top" labelid="label57" style="width: 100% !important;">
T. Left</label>
<input fieldid="field57" type="number" id="elementRadiusTopinput" name="Radius Top" style="width: 100% !important;" max="100" value="" step="1" min="0" class="base-mode">

<input fieldid="field57" type="number" id="elementRadiusTopinput-hover" name="Radius Top" style="width: 100% !important;" max="100" value="" step="1" min="0" class="hover-mode">

<input fieldid="field57" type="number" id="elementRadiusTopinput-active" name="Radius Top" style="width: 100% !important;" max="100" value="" step="1" min="0" class="active-mode">

<input fieldid="field57" type="number" id="elementRadiusTopinput-tablet" name="Radius Top" style="width: 100% !important;" max="100" value="" step="1" min="0" class="tablet-mode">

<input fieldid="field57" type="number" id="elementRadiusTopinput-mobile" name="Radius Top" style="width: 100% !important;" max="100" value="" step="1" min="0" class="mobile-mode">

</div>
<div id="elementRadiusRight" inputid="inputid59" style="width: 25% !important;">
<label id="elementRadiusRightlabel" for="Radius Right" labelid="label59" style="width: 100% !important;">
B. Right</label>

<input fieldid="field59" type="number" id="elementRadiusRightinput" name="Radius Right" style="width: 100% !important;" max="100" value="" step="1" min="0" class="base-mode">

<input fieldid="field59" type="number" id="elementRadiusRightinput-hover" name="Radius Right" style="width: 100% !important;" max="100" value="" step="1" min="0" class="hover-mode">

<input fieldid="field59" type="number" id="elementRadiusRightinput-active" name="Radius Right" style="width: 100% !important;" max="100" value="" step="1" min="0" class="active-mode">

<input fieldid="field59" type="number" id="elementRadiusRightinput-tablet" name="Radius Right" style="width: 100% !important;" max="100" value="" step="1" min="0" class="tablet-mode">

<input fieldid="field59" type="number" id="elementRadiusRightinput-mobile" name="Radius Right" style="width: 100% !important;" max="100" value="" step="1" min="0" class="mobile-mode">

</div>
<div id="elementRadiusBottom" inputid="inputid60" style="width: 25% !important;">
<label id="elementRadiusBottomlabel" for="Radius Bottom" labelid="label60" style="width: 100% !important;">
B. Left</label>

<input fieldid="field60" type="number" min="0" id="elementRadiusBottominput" name="Radius Bottom" style="width: 100% !important;" class="base-mode">

<input fieldid="field60" type="number" min="0" id="elementRadiusBottominput-hover" name="Radius Bottom" style="width: 100% !important;" class="hover-mode">

<input fieldid="field60" type="number" min="0" id="elementRadiusBottominput-active" name="Radius Bottom" style="width: 100% !important;" class="active-mode">

<input fieldid="field60" type="number" min="0" id="elementRadiusBottominput-tablet" name="Radius Bottom" style="width: 100% !important;" class="tablet-mode">

<input fieldid="field60" type="number" min="0" id="elementRadiusBottominput-mobile" name="Radius Bottom" style="width: 100% !important;" class="mobile-mode">

</div>
<div id="elementRadiusLeft" inputid="inputid61" style="width: 25% !important;">
<label id="elementRadiusLeftlabel" for="Radius Left" labelid="label61" style="width: 100% !important;">
B. Left</label>
<input fieldid="field61" type="number" id="elementRadiusLeftinput" name="Radius Left" max="100" value="" step="1" min="0" style="width: 100% !important;" class="base-mode">

<input fieldid="field61" type="number" id="elementRadiusLeftinput-hover" name="Radius Left" max="100" value="" step="1" min="0" style="width: 100% !important;" class="hover-mode">

<input fieldid="field61" type="number" id="elementRadiusLeftinput-active" name="Radius Left" max="100" value="" step="1" min="0" style="width: 100% !important;" class="active-mode">

<input fieldid="field61" type="number" id="elementRadiusLeftinput-tablet" name="Radius Left" max="100" value="" step="1" min="0" style="width: 100% !important;" class="tablet-mode">

<input fieldid="field61" type="number" id="elementRadiusLeftinput-mobile" name="Radius Left" max="100" value="" step="1" min="0" style="width: 100% !important;" class="mobile-mode">



</div>
<hr inputid="inputid62" fieldid="field62" style="border-top: 1px solid rgba(250, 250, 250, 0.41); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormborderRadius };
//==========================
const editFormboxShadow=`<div id="checkElementBoxSHadow" inputid="inputid63" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100%;">
<label id="checkElementBoxSHadowlabel" for="check Box Shadow" labelid="label63" style="width: 90% !important;">
Box-shadow</label>
<input fieldid="field63" type="checkbox" id="checkElementBoxShadowinput" name="check Box Shadow" style="width: 10% !important;" class="checkbox-FormEditElement base-mode">

<input fieldid="field63" type="checkbox" id="checkElementBoxShadowinput-hover" name="check Box Shadow" style="width: 10% !important;" class="checkbox-FormEditElement hover-mode">

<input fieldid="field63" type="checkbox" id="checkElementBoxShadowinput-active" name="check Box Shadow" style="width: 10% !important;" class="checkbox-FormEditElement active-mode">

<input fieldid="field63" type="checkbox" id="checkElementBoxShadowinput-tablet" name="check Box Shadow" style="width: 10% !important;" class="checkbox-FormEditElement tablet-mode">

<input fieldid="field63" type="checkbox" id="checkElementBoxShadowinput-mobile" name="check Box Shadow" style="width: 10% !important;" class="checkbox-FormEditElement mobile-mode">

</div>
<div id="elementHorizontal shadow length" inputid="inputid64" style="width: 100%;">
<label id="elementHorizontal shadow lengthlabel" for="Horizontal shadow length" labelid="label64" style="width: 60% !important;">
Horizontal shadow</label>
<input fieldid="field64" type="range" min="-100" max="100" value="" step="1" id="elementHorizontalShadowLengthInput" name="Horizontal shadow length" style="width: 35% !important;" class="base-mode">

<input fieldid="field64" type="range" min="-100" max="100" value="" step="1" id="elementHorizontalShadowLengthInput-hover" name="Horizontal shadow length" style="width: 35% !important;" class="hover-mode">

<input fieldid="field64" type="range" min="-100" max="100" value="" step="1" id="elementHorizontalShadowLengthInput-active" name="Horizontal shadow length" style="width: 35% !important;" class="active-mode">

<input fieldid="field64" type="range" min="-100" max="100" value="" step="1" id="elementHorizontalShadowLengthInput-tablet" name="Horizontal shadow length" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field64" type="range" min="-100" max="100" value="" step="1" id="elementHorizontalShadowLengthInput-mobile" name="Horizontal shadow length" style="width: 35% !important;" class="mobile-mode">

</div>
<div id="elementVerticalshadowlength" inputid="inputid65" style="width: 100%;">
<label id="elementVerticalshadowlengthlabel" for="Vertical shadow length" labelid="label65" style="width: 60% !important;">
Vertical shadow</label>
<input fieldid="field65" type="range" min="-100" max="100" value="" step="1" id="elementVerticalshadowlengthinput" name="Vertical shadow length" style="width: 35% !important;" class="base-mode">

<input fieldid="field65" type="range" min="-100" max="100" value="" step="1" id="elementVerticalshadowlengthinput-hover" name="Vertical shadow length" style="width: 35% !important;" class="hover-mode">

<input fieldid="field65" type="range" min="-100" max="100" value="" step="1" id="elementVerticalshadowlengthinput-active" name="Vertical shadow length" style="width: 35% !important;" class="active-mode">

<input fieldid="field65" type="range" min="-100" max="100" value="" step="1" id="elementVerticalshadowlengthinput-tablet" name="Vertical shadow length" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field65" type="range" min="-100" max="100" value="" step="1" id="elementVerticalshadowlengthinput-mobile" name="Vertical shadow length" style="width: 35% !important;" class="mobile-mode">

</div>
<div id="elementBlur radius" inputid="inputid66" style="width: 100%;">
<label id="elementBlur radiuslabel" for="Blur Radius" labelid="label66" style="width: 60% !important;">
Blur radius</label>
<input fieldid="field66" type="range" min="0" max="200" value="" step="1" id="elementBlurRadiusInput" name="Blur Radius" style="width: 35% !important;" class="base-mode">

<input fieldid="field66" type="range" min="0" max="200" value="" step="1" id="elementBlurRadiusInput-hover" name="Blur Radius" style="width: 35% !important;" class="hover-mode">

<input fieldid="field66" type="range" min="0" max="200" value="" step="1" id="elementBlurRadiusInput-active" name="Blur Radius" style="width: 35% !important;" class="active-mode">

<input fieldid="field66" type="range" min="0" max="200" value="" step="1" id="elementBlurRadiusInput-tablet" name="Blur Radius" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field66" type="range" min="0" max="200" value="" step="1" id="elementBlurRadiusInput-mobile" name="Blur Radius" style="width: 35% !important;" class="mobile-mode">

</div>
<div id="elementSpread radius" inputid="inputid67" style="width: 100%;">
<label id="elementSpread radiuslabel" for="Spread radius" labelid="label67" style="width: 60% !important;">
Spread radius</label>
<input fieldid="field67" type="range" min="-250" max="250" value="" step="1" id="elementSpreadRadiusInput" name="Spread radius" style="width: 35% !important;" class="base-mode">

<input fieldid="field67" type="range" min="-250" max="250" value="" step="1" id="elementSpreadRadiusInput-hover" name="Spread radius" style="width: 35% !important;" class="hover-mode">

<input fieldid="field67" type="range" min="-250" max="250" value="" step="1" id="elementSpreadRadiusInput-active" name="Spread radius" style="width: 35% !important;" class="active-mode">

<input fieldid="field67" type="range" min="-250" max="250" value="" step="1" id="elementSpreadRadiusInput-tablet" name="Spread radius" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field67" type="range" min="-250" max="250" value="" step="1" id="elementSpreadRadiusInput-mobile" name="Spread radius" style="width: 35% !important;" class="mobile-mode">

</div>
<div id="Newfield68" inputid="inputid68" style="width: 100% !important;">
<label id="NewField68" for="Shadow color" labelid="label68" style="width: 65% !important;">
Shadow color</label>

<input fieldid="field68" type="color" value="#312532" id="shadowColorInput" name="Shadow color" style="width: 30% !important;" class="base-mode">

<input fieldid="field68" type="color" value="#312532" id="shadowColorInput-hover" name="Shadow color" style="width: 30% !important;" class="hover-mode">

<input fieldid="field68" type="color" value="#312532" id="shadowColorInput-active" name="Shadow color" style="width: 30% !important;" class="active-mode">

<input fieldid="field68" type="color" value="#312532" id="shadowColorInput-tablet" name="Shadow color" style="width: 30% !important;" class="tablet-mode">

<input fieldid="field68" type="color" value="#312532" id="shadowColorInput-mobile" name="Shadow color" style="width: 30% !important;" class="mobile-mode">

</div>
<div id="elementShadow opacity" inputid="inputid69" style="width: 100% !important;">
<label id="elementShadow opacitylabel" for="Shadow opacity" labelid="label69" style="width: 60% !important;">
Shadow opacity</label>

<input fieldid="field69" type="range" min="0" max="1" value="" step="0.01" id="elementShadowOpacityInput" name="Shadow opacity" style="width: 35% !important;" class="base-mode">

<input fieldid="field69" type="range" min="0" max="1" value="" step="0.01" id="elementShadowOpacityInput-hover" name="Shadow opacity" style="width: 35% !important;" class="hover-mode">

<input fieldid="field69" type="range" min="0" max="1" value="" step="0.01" id="elementShadowOpacityInput-active" name="Shadow opacity" style="width: 35% !important;" class="active-mode">

<input fieldid="field69" type="range" min="0" max="1" value="" step="0.01" id="elementShadowOpacityInput-tablet" name="Shadow opacity" style="width: 35% !important;" class="tablet-mode">

<input fieldid="field69" type="range" min="0" max="1" value="" step="0.01" id="elementShadowOpacityInput-mobile" name="Shadow opacity" style="width: 35% !important;" class="mobile-mode">

</div>
<div id="elementShadowInsetOutset" inputid="inputid70" style="width: 100%;">
<label id="elementShadowInsetOutsetlabel" for="NewFIeld70" labelid="label70" style="width: 100%; display: none;">
select Field 70</label>
<select fieldid="field70" id="elementShadowInsetOutsetinput" name="NewFIeld70" style="width: 100%;" class="base-mode">
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>

<select fieldid="field70" id="elementShadowInsetOutsetinput-hover" name="NewFIeld70" style="width: 100%;" class="hover-mode">
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>

<select fieldid="field70" id="elementShadowInsetOutsetinput-active" name="NewFIeld70" style="width: 100%;" class="active-mode">
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>

<select fieldid="field70" id="elementShadowInsetOutsetinput-tablet" name="NewFIeld70" style="width: 100%;" class="tablet-mode">
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>

<select fieldid="field70" id="elementShadowInsetOutsetinput-mobile" name="NewFIeld70" style="width: 100%;" class="mobile-mode">
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>

</div>
<hr inputid="inputid71" fieldid="field71" style="border-top: 1px solid rgba(255, 255, 255, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;

export { editFormboxShadow };

const cssFilter = `
<div class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100%;">
<label style="width: 90% !important;">
Filter </label>

<input type="checkbox" id="css-Filter-Checkbox" style="width: 10% !important;" class="checkbox-FormEditElement">

</div>

<div id="css-filter-div" style="width: 100% !important; padding: 0.3rem; padding-left: 1.2rem; outline: 1px solid rgba(255, 255, 255, 0.39);">

<div style="width: 100% !important;">
<label id="filter-css-blur-label" style="width: 70% !important;">Blur (px) </label>

<input id="filter-css-blur-input" type="range" step="1" value="0" min="0" max="100" class="base-mode">

<input id="filter-css-blur-input-hover" type="range" step="1" value="0" min="0" max="100" class="hover-mode">

<input id="filter-css-blur-input-active" type="range" step="1" value="0" min="0" max="100" class="active-mode">

<input id="filter-css-blur-input-tablet" type="range" step="1" value="0" min="0" max="100" class="tablet-mode">

<input id="filter-css-blur-input-mobile" type="range" step="1" value="0" min="0" max="100" class="mobile-mode">
</div>

<div style="width: 100% !important;">
<label id="filter-css-Brightness-label" style="width: 70% !important;">Brightness (%) </label>

<input id="filter-css-Brightness-input" type="range" step="1" value="100" min="0" max="300" class="base-mode">

<input id="filter-css-Brightness-input-hover" type="range" step="1" value="100" min="0" max="300" class="hover-mode">

<input id="filter-css-Brightness-input-active" type="range" step="1" value="100" min="0" max="300" class="active-mode">

<input id="filter-css-Brightness-input-tablet" type="range" step="1" value="100" min="0" max="300" class="tablet-mode">

<input id="filter-css-Brightness-input-mobile" type="range" step="1" value="100" min="0" max="300" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-Contrast-label" style="width: 70% !important;">Contrast (%) </label>

<input id="filter-css-Contrast-input" type="range" step="1" value="100" min="0" max="300" class="base-mode">

<input id="filter-css-Contrast-input-hover" type="range" step="1" value="100" min="0" max="300" class="hover-mode">

<input id="filter-css-Contrast-input-active" type="range" step="1" value="100" min="0" max="300" class="active-mode">

<input id="filter-css-Contrast-input-tablet" type="range" step="1" value="100" min="0" max="300" class="tablet-mode">

<input id="filter-css-Contrast-input-mobile" type="range" step="1" value="100" min="0" max="300" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-Greyscale-label" style="width: 70% !important;">Greyscale (%) </label>

<input id="filter-css-Greyscale-input" type="range" step="1" value="0" min="0" max="100" class="base-mode">

<input id="filter-css-Greyscale-input-hover" type="range" step="1" value="0" min="0" max="100" class="hover-mode">

<input id="filter-css-Greyscale-input-active" type="range" step="1" value="0" min="0" max="100" class="active-mode">

<input id="filter-css-Greyscale-input-tablet" type="range" step="1" value="0" min="0" max="100" class="tablet-mode">

<input id="filter-css-Greyscale-input-mobile" type="range" step="1" value="0" min="0" max="100" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-hue-label" style="width: 70% !important;">Hue-rotate (deg) </label>

<input id="filter-css-hue-input" type="range" step="1" value="0" min="0" max="359" class="base-mode">

<input id="filter-css-hue-input-hover" type="range" step="1" value="0" min="0" max="359" class="hover-mode">

<input id="filter-css-hue-input-active" type="range" step="1" value="0" min="0" max="359" class="active-mode">

<input id="filter-css-hue-input-tablet" type="range" step="1" value="0" min="0" max="359" class="tablet-mode">

<input id="filter-css-hue-input-mobile" type="range" step="1" value="0" min="0" max="359" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-Invert-label" style="width: 70% !important;">Invert (%) </label>

<input id="filter-css-Invert-input" type="range" step="1" value="100" min="0" max="100" class="base-mode">

<input id="filter-css-Invert-input-hover" type="range" step="1" value="100" min="0" max="100" class="hover-mode">

<input id="filter-css-Invert-input-active" type="range" step="1" value="100" min="0" max="100" class="active-mode">

<input id="filter-css-Invert-input-tablet" type="range" step="1" value="100" min="0" max="100" class="tablet-mode">

<input id="filter-css-Invert-input-mobile" type="range" step="1" value="100" min="0" max="100" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-Saturate-label" style="width: 70% !important;">Saturate ( ) </label>

<input id="filter-css-Saturate-input" type="range" step="0.01" value="1" min="0" max="3" class="base-mode">

<input id="filter-css-Saturate-input-hover" type="range" step="0.01" value="1" min="0" max="3" class="hover-mode">

<input id="filter-css-Saturate-input-active" type="range" step="0.01" value="1" min="0" max="3" class="active-mode">

<input id="filter-css-Saturate-input-tablet" type="range" step="0.01" value="1" min="0" max="3" class="tablet-mode">

<input id="filter-css-Saturate-input-mobile" type="range" step="0.01" value="1" min="0" max="3" class="mobile-mode">

</div>

<div style="width: 100% !important;">
<label id="filter-css-Sepia-label" style="width: 70% !important;">Sepia ( ) </label>

<input id="filter-css-Sepia-input" type="range" step="0.01" value="0" min="0" max="1" class="base-mode">

<input id="filter-css-Sepia-input-hover" type="range" step="0.01" value="0" min="0" max="1" class="hover-mode">

<input id="filter-css-Sepia-input-active" type="range" step="0.01" value="0" min="0" max="1" class="active-mode">

<input id="filter-css-Sepia-input-tablet" type="range" step="0.01" value="0" min="0" max="1" class="tablet-mode">

<input id="filter-css-Sepia-input-mobile" type="range" step="0.01" value="0" min="0" max="1" class="mobile-mode">

</div>


</div>
<hr inputid="inputid71" fieldid="field71" style="border-top: 1px solid rgba(255, 255, 255, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">

`;

export {cssFilter};

//==========================
const editFormfontFamily=`<paragraph inputid="inputid72" fieldid="field72" style="width: 100%; font-size: 12px; margin-left: -2%; color: rgb(255, 255, 255); opacity: 1;">
Typography</paragraph>
<div id="elementFontFamily" inputid="inputid73" style="width: 100%;" class="base-mode">
<label id="elementFontFamilylabel" for="NewFIeld73" labelid="label73" style="width: 45% !important;">
Font-family :</label>
<select fieldid="field73" id="elementFontFamilyinput" name="NewFIeld73" style="width: 50% !important;">
<option value="">
</option>
</select>
</div>`;
export { editFormfontFamily };
//==========================
const editFormtextAlign=`<div id="elementTextAlign" inputid="inputid75" style="width: 100%; opacity: 1;">
<label id="elementTextAlignlabel" for="NewFIeld75" labelid="label75" style="width: 65% !important;">
Text-align :</label>
<select fieldid="field75" id="elementTextAligninput" name="NewFIeld75" style="width: 30% !important;" class="base-mode">
<option value="">
</option>
<option value="left">
left</option>
<option value="right">
right</option>
<option value="center">
center</option>
<option value="justify">
justify</option>
<option value="initial">
initial</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field75" id="elementTextAligninput-hover" name="NewFIeld75" style="width: 30% !important;" class="hover-mode">
<option value="">
</option>
<option value="left">
left</option>
<option value="right">
right</option>
<option value="center">
center</option>
<option value="justify">
justify</option>
<option value="initial">
initial</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field75" id="elementTextAligninput-active" name="NewFIeld75" style="width: 30% !important;" class="active-mode">
<option value="">
</option>
<option value="left">
left</option>
<option value="right">
right</option>
<option value="center">
center</option>
<option value="justify">
justify</option>
<option value="initial">
initial</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field75" id="elementTextAligninput-tablet" name="NewFIeld75" style="width: 30% !important;" class="tablet-mode">
<option value="">
</option>
<option value="left">
left</option>
<option value="right">
right</option>
<option value="center">
center</option>
<option value="justify">
justify</option>
<option value="initial">
initial</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field75" id="elementTextAligninput-mobile" name="NewFIeld75" style="width: 30% !important;" class="mobile-mode">
<option value="">
</option>
<option value="left">
left</option>
<option value="right">
right</option>
<option value="center">
center</option>
<option value="justify">
justify</option>
<option value="initial">
initial</option>
<option value="inherit">
inherit</option>
</select>

</div>`;
export { editFormtextAlign };
//==========================
const editFormfontColor = `<div id="elementfontcolor" inputid="inputid74" style="width: 100%; opacity: 1;">
<label id="elementfontcolorlabel" for="Font Color" labelid="label74" style="width: 75% !important;">
Color :</label>

<input fieldid="field74" type="color" value="#312532" id="elementfontcolorinput" name="Font Color" style="width: 20% !important;" class="base-mode">

<input fieldid="field74" type="color" value="#312532" id="elementfontcolorinput-hover" name="Font Color" style="width: 20% !important;" class="hover-mode">

<input fieldid="field74" type="color" value="#312532" id="elementfontcolorinput-active" name="Font Color" style="width: 20% !important;" class="active-mode">

<input fieldid="field74" type="color" value="#312532" id="elementfontcolorinput-tablet" name="Font Color" style="width: 20% !important;" class="tablet-mode">

<input fieldid="field74" type="color" value="#312532" id="elementfontcolorinput-mobile" name="Font Color" style="width: 20% !important;" class="mobile-mode">

</div>
<hr inputid="inputid76" fieldid="field76" style="border-top: 1px solid rgba(255, 255, 255, 0.41); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormfontColor };
//==========================
const editFormMargin = `<div id="elementMArgin" inputid="inputid78" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 70% !important;">
<label id="elementMArginlabel" for="Margin" labelid="label78" style="width: 90% !important;">
Margin</label>
<input fieldid="field78" type="checkbox" id="Check-element-Margin-input" name="Margin" style="width: 10% !important;" class="checkbox-FormEditElement base-mode">

<input fieldid="field78" type="checkbox" id="Check-element-Margin-input-hover" name="Margin" style="width: 10% !important;" class="checkbox-FormEditElement hover-mode">

<input fieldid="field78" type="checkbox" id="Check-element-Margin-input-active" name="Margin" style="width: 10% !important;" class="checkbox-FormEditElement active-mode">

<input fieldid="field78" type="checkbox" id="Check-element-Margin-input-tablet" name="Margin" style="width: 10% !important;" class="checkbox-FormEditElement tablet-mode">

<input fieldid="field78" type="checkbox" id="Check-element-Margin-input-mobile" name="Margin" style="width: 10% !important;" class="checkbox-FormEditElement mobile-mode">

</div>
<div id="elementMarginParam" inputid="inputid79" style="width: 30% !important;">
<label id="elementMarginParamlabel" for="NewFIeld79" labelid="label79" style="width: 100%; display: none;">
Margin Parameter</label>
<select fieldid="field79" id="element-Margin-Param-input" name="NewFIeld79" style="width: 100%;" class="base-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field79" id="element-Margin-Param-input-hover" name="NewFIeld79" style="width: 100%;" class="hover-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field79" id="element-Margin-Param-input-active" name="NewFIeld79" style="width: 100%;" class="active-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field79" id="element-Margin-Param-input-tablet" name="NewFIeld79" style="width: 100%;" class="tablet-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field79" id="element-Margin-Param-input-mobile" name="NewFIeld79" style="width: 100%;" class="mobile-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

</div>
<div id="elementMarginTop" inputid="inputid80" style="width: 25% !important;">
<label id="elementMarginToplabel" for="Margin Top" labelid="label80" style="width: 100%;">
Top</label>
<input fieldid="field80" type="number" id="element-Margin-Top-input" name="Margin Top" style="width: 100%;" max="" value="" step="1" min="" class="base-mode">

<input fieldid="field80" type="number" id="element-Margin-Top-input-hover" name="Margin Top" style="width: 100%;" max="" value="" step="1" min="" class="hover-mode">

<input fieldid="field80" type="number" id="element-Margin-Top-input-active" name="Margin Top" style="width: 100%;" max="" value="" step="1" min="" class="active-mode">

<input fieldid="field80" type="number" id="element-Margin-Top-input-tablet" name="Margin Top" style="width: 100%;" max="" value="" step="1" min="" class="tablet-mode">

<input fieldid="field80" type="number" id="element-Margin-Top-input-mobile" name="Margin Top" style="width: 100%;" max="" value="" step="1" min="" class="mobile-mode">

</div>
<div id="elementMargin Right" inputid="inputid81" style="width: 25% !important;">
<label id="elementMargin Rightlabel" for="Margin Right" labelid="label81" style="width: 100%;">
Right</label>
<input fieldid="field81" type="number" min="0" id="element-Margin-Right-input" name="Margin Right" style="width: 100%;" class="base-mode">

<input fieldid="field81" type="number" min="0" id="element-Margin-Right-input-hover" name="Margin Right" style="width: 100%;" class="hover-mode">

<input fieldid="field81" type="number" min="0" id="element-Margin-Right-input-active" name="Margin Right" style="width: 100%;" class="active-mode">

<input fieldid="field81" type="number" min="0" id="element-Margin-Right-input-tablet" name="Margin Right" style="width: 100%;" class="tablet-mode">

<input fieldid="field81" type="number" min="0" id="element-Margin-Right-input-mobile" name="Margin Right" style="width: 100%;" class="mobile-mode">

</div>
<div id="elementMarginBottom" inputid="inputid82" style="width: 25% !important;">
<label id="elementMarginBottomlabel" for="Margin Bottom" labelid="label82" style="width: 100%;">
Bottom</label>
<input fieldid="field82" type="number" id="element-Margin-Bottom-input" name="Margin Bottom" style="width: 100%;" max="" value="" step="1" min="" class="base-mode">

<input fieldid="field82" type="number" id="element-Margin-Bottom-input-hover" name="Margin Bottom" style="width: 100%;" max="" value="" step="1" min="" class="hover-mode">

<input fieldid="field82" type="number" id="element-Margin-Bottom-input-active" name="Margin Bottom" style="width: 100%;" max="" value="" step="1" min="" class="active-mode">

<input fieldid="field82" type="number" id="element-Margin-Bottom-input-tablet" name="Margin Bottom" style="width: 100%;" max="" value="" step="1" min="" class="tablet-mode">

<input fieldid="field82" type="number" id="element-Margin-Bottom-input-mobile" name="Margin Bottom" style="width: 100%;" max="" value="" step="1" min="" class="mobile-mode">

</div>
<div id="elementMarginLeft" inputid="inputid83" style="width: 25% !important;">
<label id="elementMarginLeftlabel" for="Margin Left" labelid="label83" style="width: 100%;">
Left</label>
<input fieldid="field83" type="number" id="element-Margin-Left-input" name="Margin Left" max="" value="" step="1" min="" style="width: 100%;" class="base-mode">

<input fieldid="field83" type="number" id="element-Margin-Left-input-hover" name="Margin Left" max="" value="" step="1" min="" style="width: 100%;" class="hover-mode">

<input fieldid="field83" type="number" id="element-Margin-Left-input-active" name="Margin Left" max="" value="" step="1" min="" style="width: 100%;" class="active-mode">

<input fieldid="field83" type="number" id="element-Margin-Left-input-tablet" name="Margin Left" max="" value="" step="1" min="" style="width: 100%;" class="tablet-mode">

<input fieldid="field83" type="number" id="element-Margin-Left-input-mobile" name="Margin Left" max="" value="" step="1" min="" style="width: 100%;" class="mobile-mode">

</div>
<hr inputid="inputid84" fieldid="field84" style="border-top: 1px solid rgba(252, 252, 252, 0.62); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormMargin };
//==========================
const editFormPadding = `<div id="elementPaddingCheck" inputid="inputid85" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 70% !important;">
<label id="elementPaddingChecklabel" for="Padding" labelid="label85" style="width: 100%;">
Padding</label>
<input fieldid="field85" type="checkbox" id="Check-element-Padding-input" name="Padding" style="width: 100%;" class="checkbox-FormEditElement base-mode">

<input fieldid="field85" type="checkbox" id="Check-element-Padding-input-hover" name="Padding" style="width: 100%;" class="checkbox-FormEditElement hover-mode">

<input fieldid="field85" type="checkbox" id="Check-element-Padding-input-active" name="Padding" style="width: 100%;" class="checkbox-FormEditElement active-mode">

<input fieldid="field85" type="checkbox" id="Check-element-Padding-input-tablet" name="Padding" style="width: 100%;" class="checkbox-FormEditElement tablet-mode">

<input fieldid="field85" type="checkbox" id="Check-element-Padding-input-mobile" name="Padding" style="width: 100%;" class="checkbox-FormEditElement mobile-mode">

</div>
<div id="elementPAddingParam" inputid="inputid86" style="width: 30% !important;">
<label id="elementPAddingParamlabel" for="NewFIeld86" labelid="label86" style="width: 100%; display: none;">
select Field 86</label>
<select fieldid="field86" id="element-Padding-Param-input" name="NewFIeld86" style="width: 100%;" class="base-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field86" id="element-Padding-Param-input-hover" name="NewFIeld86" style="width: 100%;" class="hover-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field86" id="element-Padding-Param-input-active" name="NewFIeld86" style="width: 100%;" class="active-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field86" id="element-Padding-Param-input-tablet" name="NewFIeld86" style="width: 100%;" class="tablet-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

<select fieldid="field86" id="element-Padding-Param-input-mobile" name="NewFIeld86" style="width: 100%;" class="mobile-mode">
<option value="px">
px</option>
<option value="%">
%</option>
<option value="em">
em</option>
<option value="rem">
rem</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
</select>

</div>
<div id="elementPadding Top" inputid="inputid87" style="width: 25% !important;">
<label id="elementPadding Toplabel" for="Padding Top" labelid="label87" style="width: 100%;">
Top</label>
<input fieldid="field87" type="number" id="element-Padding-Top-input" name="Padding Top" style="width: 100%;" max="" value="" step="1" min="0" class="base-mode">

<input fieldid="field87" type="number" id="element-Padding-Top-input-hover" name="Padding Top" style="width: 100%;" max="" value="" step="1" min="0" class="hover-mode">

<input fieldid="field87" type="number" id="element-Padding-Top-input-active" name="Padding Top" style="width: 100%;" max="" value="" step="1" min="0" class="active-mode">

<input fieldid="field87" type="number" id="element-Padding-Top-input-tablet" name="Padding Top" style="width: 100%;" max="" value="" step="1" min="0" class="tablet-mode">

<input fieldid="field87" type="number" id="element-Padding-Top-input-mobile" name="Padding Top" style="width: 100%;" max="" value="" step="1" min="0" class="mobile-mode">

</div>
<div id="elementPadding Right" inputid="inputid88" style="width: 25% !important;">
<label id="elementPadding Rightlabel" for="Padding Right" labelid="label88" style="width: 100%;">
Right</label>
<input fieldid="field88" type="number" id="element-Padding-Right-input" name="Padding Right" style="width: 100%;" max="" value="" step="1" min="0" class="base-mode">

<input fieldid="field88" type="number" id="element-Padding-Right-input-hover" name="Padding Right" style="width: 100%;" max="" value="" step="1" min="0" class="hover-mode">

<input fieldid="field88" type="number" id="element-Padding-Right-input-active" name="Padding Right" style="width: 100%;" max="" value="" step="1" min="0" class="active-mode">

<input fieldid="field88" type="number" id="element-Padding-Right-input-tablet" name="Padding Right" style="width: 100%;" max="" value="" step="1" min="0" class="tablet-mode">

<input fieldid="field88" type="number" id="element-Padding-Right-input-mobile" name="Padding Right" style="width: 100%;" max="" value="" step="1" min="0" class="mobile-mode">

</div>
<div id="elementPadding Bottom" inputid="inputid89" style="width: 25% !important;">
<label id="elementPadding Bottomlabel" for="Padding Bottom" labelid="label89" style="width: 100%;">
Bottom</label>
<input fieldid="field89" type="number" id="element-Padding-Bottom-input" name="Padding Bottom" style="width: 100%;" max="" value="" step="1" min="0" class="base-mode">

<input fieldid="field89" type="number" id="element-Padding-Bottom-input-hover" name="Padding Bottom" style="width: 100%;" max="" value="" step="1" min="0" class="hover-mode">

<input fieldid="field89" type="number" id="element-Padding-Bottom-input-active" name="Padding Bottom" style="width: 100%;" max="" value="" step="1" min="0" class="active-mode">

<input fieldid="field89" type="number" id="element-Padding-Bottom-input-tablet" name="Padding Bottom" style="width: 100%;" max="" value="" step="1" min="0" class="tablet-mode">

<input fieldid="field89" type="number" id="element-Padding-Bottom-input-mobile" name="Padding Bottom" style="width: 100%;" max="" value="" step="1" min="0" class="mobile-mode">

</div>
<div id="elementPadding Left" inputid="inputid90" style="width: 25% !important;">
<label id="elementPadding Leftlabel" for="Padding Left" labelid="label90" style="width: 100%;">
Left</label>
<input fieldid="field90" type="number" id="element-Padding-Left-input" name="Padding Left" max="" value="" step="1" min="0" style="width: 100%;" class="base-mode">

<input fieldid="field90" type="number" id="element-Padding-Left-input-hover" name="Padding Left" max="" value="" step="1" min="0" style="width: 100%;" class="hover-mode">

<input fieldid="field90" type="number" id="element-Padding-Left-input-active" name="Padding Left" max="" value="" step="1" min="0" style="width: 100%;" class="active-mode">

<input fieldid="field90" type="number" id="element-Padding-Left-input-tablet" name="Padding Left" max="" value="" step="1" min="0" style="width: 100%;" class="tablet-mode">

<input fieldid="field90" type="number" id="element-Padding-Left-input-mobile" name="Padding Left" max="" value="" step="1" min="0" style="width: 100%;" class="mobile-mode">

</div>
<hr inputid="inputid91" fieldid="field91" style="border-top: 1px solid rgba(255, 255, 255, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormPadding };
//==========================
const editFormElementID = `<div id="ElementtId" inputid="inputid92" style="width: 100% !important;" class="base-mode">
<label id="ElementtIdlabel" for="Element ID" labelid="label92" style="width: 55% !important;">
Element ID : </label>
<input fieldid="field92" type="text" id="elementt-Id-Input" name="Element ID" style="width: 40% !important;">
</div>`;
export { editFormElementID };
//==========================
const editFormelementClass = `<div id="elementMainClass" inputid="inputid93" style="width: 100%;" class="base-mode">
<label id="elementMainClasslabel" for="Element Main CLass" labelid="label93" style="width: 55% !important;">
Element Main Class :</label>
<input fieldid="field93" type="text" id="element-MainClass-Input" name="Element Main CLass" style="width: 40% !important;">
</div>
<div id="elementOtherClass" inputid="inputid94" style="width: 100%;" class="base-mode">
<label id="elementOtherClasslabel" for="Element Other Class" labelid="label94" style="width: 100%;">
Element Classes :</label>
<textarea fieldid="field94" id="element-Other-Class-input" name="Element Other Class" placeholder="Separate By Space ( );" rows="2" style="width: 100%;">
</textarea>
</div>
<hr class="base-mode" inputid="inputid95" fieldid="field95" style="border-top: 1px solid rgba(255, 255, 255, 0.38); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
<div class="checkbox-FormEditElement base-mode" style="width: 90% !important;">
<label style="width: 900%;">Ignore Editor Styling for this Element</label>
 <input type="checkbox" id="Check-styling-destroy" name="Padding" style="width: 10%;" >
</div>
<hr class="base-mode" inputid="inputid95" fieldid="field95" style="border-top: 1px solid rgba(255, 255, 255, 0.38); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">`;
export { editFormelementClass };
//==========================
const editFormPosition = `<div id="elementPosition" inputid="inputid96" style="width: 100%;">
<label id="elementPositionlabel" for="NewFIeld96" labelid="label96" style="width: 45% !important;">
Position :</label>
<select fieldid="field96" id="element-Position-Input" name="NewFIeld96" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="relative">
relative</option>
<option value="static">
static</option>
<option value="absolute">
absolute</option>
<option value="fixed">
fixed</option>
<option value="sticky">
sticky</option>
</select>

<select fieldid="field96" id="element-Position-Input-hover" name="NewFIeld96" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="relative">
relative</option>
<option value="static">
static</option>
<option value="absolute">
absolute</option>
<option value="fixed">
fixed</option>
<option value="sticky">
sticky</option>
</select>

<select fieldid="field96" id="element-Position-Input-active" name="NewFIeld96" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="relative">
relative</option>
<option value="static">
static</option>
<option value="absolute">
absolute</option>
<option value="fixed">
fixed</option>
<option value="sticky">
sticky</option>
</select>

<select fieldid="field96" id="element-Position-Input-tablet" name="NewFIeld96" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="relative">
relative</option>
<option value="static">
static</option>
<option value="absolute">
absolute</option>
<option value="fixed">
fixed</option>
<option value="sticky">
sticky</option>
</select>

<select fieldid="field96" id="element-Position-Input-mobile" name="NewFIeld96" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="relative">
relative</option>
<option value="static">
static</option>
<option value="absolute">
absolute</option>
<option value="fixed">
fixed</option>
<option value="sticky">
sticky</option>
</select>

</div>`;
export { editFormPosition };
//==========================
const editFormCursor = `<div id="elementCursor" inputid="inputid97" style="width: 100%;">
<label id="elementCursorlabel" for="NewFIeld97" labelid="label97" style="width: 45% !important;">
Cursor : </label>
<select fieldid="field97" id="element-Cursor-Input" name="NewFIeld97" style="width: 50% !important;" class="base-mode">
<option value="">
</option>
<option value="default">
default</option>
<option value="auto">
auto</option>
<option value="pointer">
pointer</option>
<option value="crosshair">
crosshair</option>
<option value="move">
move</option>
<option value="text">
text</option>
<option value="wait">
wait</option>
<option value="help">
help</option>
<option value="not-allowed">
not-allowed</option>
<option value="progress">
progress</option>
<option value="e-resize">
e-resize</option>
<option value="w-resize">
w-resize</option>
<option value="s-resize">
s-resize</option>
<option value="n-resize">
n-resize</option>
<option value="new-resize">
new-resize</option>
<option value="col-resize">
col-resize</option>
<option value="zoom-in">
zoom-in</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field97" id="element-Cursor-Input-hover" name="NewFIeld97" style="width: 50% !important;" class="hover-mode">
<option value="">
</option>
<option value="default">
default</option>
<option value="auto">
auto</option>
<option value="pointer">
pointer</option>
<option value="crosshair">
crosshair</option>
<option value="move">
move</option>
<option value="text">
text</option>
<option value="wait">
wait</option>
<option value="help">
help</option>
<option value="not-allowed">
not-allowed</option>
<option value="progress">
progress</option>
<option value="e-resize">
e-resize</option>
<option value="w-resize">
w-resize</option>
<option value="s-resize">
s-resize</option>
<option value="n-resize">
n-resize</option>
<option value="new-resize">
new-resize</option>
<option value="col-resize">
col-resize</option>
<option value="zoom-in">
zoom-in</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field97" id="element-Cursor-Input-active" name="NewFIeld97" style="width: 50% !important;" class="active-mode">
<option value="">
</option>
<option value="default">
default</option>
<option value="auto">
auto</option>
<option value="pointer">
pointer</option>
<option value="crosshair">
crosshair</option>
<option value="move">
move</option>
<option value="text">
text</option>
<option value="wait">
wait</option>
<option value="help">
help</option>
<option value="not-allowed">
not-allowed</option>
<option value="progress">
progress</option>
<option value="e-resize">
e-resize</option>
<option value="w-resize">
w-resize</option>
<option value="s-resize">
s-resize</option>
<option value="n-resize">
n-resize</option>
<option value="new-resize">
new-resize</option>
<option value="col-resize">
col-resize</option>
<option value="zoom-in">
zoom-in</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field97" id="element-Cursor-Input-tablet" name="NewFIeld97" style="width: 50% !important;" class="tablet-mode">
<option value="">
</option>
<option value="default">
default</option>
<option value="auto">
auto</option>
<option value="pointer">
pointer</option>
<option value="crosshair">
crosshair</option>
<option value="move">
move</option>
<option value="text">
text</option>
<option value="wait">
wait</option>
<option value="help">
help</option>
<option value="not-allowed">
not-allowed</option>
<option value="progress">
progress</option>
<option value="e-resize">
e-resize</option>
<option value="w-resize">
w-resize</option>
<option value="s-resize">
s-resize</option>
<option value="n-resize">
n-resize</option>
<option value="new-resize">
new-resize</option>
<option value="col-resize">
col-resize</option>
<option value="zoom-in">
zoom-in</option>
<option value="inherit">
inherit</option>
</select>

<select fieldid="field97" id="element-Cursor-Input-mobile" name="NewFIeld97" style="width: 50% !important;" class="mobile-mode">
<option value="">
</option>
<option value="default">
default</option>
<option value="auto">
auto</option>
<option value="pointer">
pointer</option>
<option value="crosshair">
crosshair</option>
<option value="move">
move</option>
<option value="text">
text</option>
<option value="wait">
wait</option>
<option value="help">
help</option>
<option value="not-allowed">
not-allowed</option>
<option value="progress">
progress</option>
<option value="e-resize">
e-resize</option>
<option value="w-resize">
w-resize</option>
<option value="s-resize">
s-resize</option>
<option value="n-resize">
n-resize</option>
<option value="new-resize">
new-resize</option>
<option value="col-resize">
col-resize</option>
<option value="zoom-in">
zoom-in</option>
<option value="inherit">
inherit</option>
</select>

</div>`;
export { editFormCursor };
//==========================
const editFormOpacity = `<div id="elementOpacity" inputid="inputid98" style="width: 100%;">
<label id="elementOpacitylabel" style="width: 45% !important;">Opacity :</label>

<input type="number" id="element-opacity-Input" name="Z-Index:" max="1" value="" step="0.01" min="0" style="width: 50% !important;" class="base-mode">
<input type="number" id="element-opacity-Input-hover" name="Z-Index:" max="1" value="" step="0.01" min="0" style="width: 50% !important;" class="hover-mode">
<input type="number" id="element-opacity-Input-active" name="Z-Index:" max="1" value="" step="0.01" min="0" style="width: 50% !important;" class="active-mode">
<input type="number" id="element-opacity-Input-tablet" name="Z-Index:" max="1" value="" step="0.01" min="0" style="width: 50% !important;" class="tablet-mode">
<input type="number" id="element-opacity-Input-mobile" name="Z-Index:" max="1" value="" step="0.01" min="0" style="width: 50% !important;" class="mobile-mode">

</div>
`;
export { editFormOpacity };
//====================================
const editFormzIndex = `<div id="elementZIndex" inputid="inputid98" style="width: 100%;">
<label id="elementZIndexlabel" for="Z-Index:" labelid="label98" style="width: 45% !important;">
Z-index :</label>

<input fieldid="field98" type="number" id="element-Z-Index-Input" name="Z-Index:" max="5000" value="" step="1" min="0" style="width: 50% !important;" class="base-mode">

<input fieldid="field98" type="number" id="element-Z-Index-Input-hover" name="Z-Index:" max="5000" value="" step="1" min="0" style="width: 50% !important;" class="hover-mode">

<input fieldid="field98" type="number" id="element-Z-Index-Input-active" name="Z-Index:" max="5000" value="" step="1" min="0" style="width: 50% !important;" class="active-mode">

<input fieldid="field98" type="number" id="element-Z-Index-Input-tablet" name="Z-Index:" max="5000" value="" step="1" min="0" style="width: 50% !important;" class="tablet-mode">

<input fieldid="field98" type="number" id="element-Z-Index-Input-mobile" name="Z-Index:" max="5000" value="" step="1" min="0" style="width: 50% !important;" class="mobile-mode">

</div>
<hr inputid="inputid106" fieldid="field106" style="border-top: 1px solid rgba(255, 255, 255, 0.35); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormzIndex };

const editForClipPath = `
<div id="clip-path-editor-id" style="width: 100%;">
<label style="width: 45% !important;">
Clip-path :</label>

<input id="clip-path-Input"style="width: 50% !important;" placeholder="e.g. circle(50px at center)" class="base-mode">

<input id="clip-path-Input-hover"style="width: 50% !important;" placeholder="e.g. circle(50px at center)" class="hover-mode">

<input id="clip-path-Input-active"style="width: 50% !important;" placeholder="e.g. circle(50px at center)" class="active-mode">

<input id="clip-path-Input-tablet"style="width: 50% !important;" placeholder="e.g. circle(50px at center)" class="tablet-mode">

<input id="clip-path-Input-mobile"style="width: 50% !important;" placeholder="e.g. circle(50px at center)" class="mobile-mode">

<p id="clip-path-guide" >open clip-path maker by Bennett Feely <a href="https://bennettfeely.com/clippy/" target="_blank"
style="color: violet; text-decoration: underline;" >here</a></p>

</div>


`; 
export {editForClipPath};

const editFormTransform = `<div id="elementTransform" style="width: 100%;">


<div class="checkbox-FormEditElement" style="width: 100%; opacity: 1;">
<label style="width: 90% !important;">Transform Properties</label>
<input type="checkbox" id="Check-Element-Transform-Input" style="width: 10% !important;" class="base-mode">
<input type="checkbox" id="Check-Element-Transform-Input-hover" style="width: 10% !important;" class="hover-mode">
<input type="checkbox" id="Check-Element-Transform-Input-active" style="width: 10% !important;" class="active-mode">
<input type="checkbox" id="Check-Element-Transform-Input-tablet" style="width: 10% !important;" class="tablet-mode">
<input type="checkbox" id="Check-Element-Transform-Input-mobile" style="width: 10% !important;" class="mobile-mode">
</div>

<div id="transform-element-open-hide" style="margin-left: 1rem;">


<div id="element-translate-x" style="width: 100%;">
<label id="translate-x (%)" style="width: 45% !important;">Translate-x (%):</label>

<input type="number" id="element-translate-x-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-translate-x-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-translate-x-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-translate-x-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-translate-x-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div id="element-translate-y" style="width: 100%;">
<label id="translate-y" style="width: 45% !important;">Translate-y (%):</label>

<input type="number" id="element-translate-y-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-translate-y-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-translate-y-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-translate-y-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-translate-y-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div style="width: 100%;">
<label style="width: 45% !important;">Translate-z (px):</label>

<input type="number" id="element-translate-z-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-translate-z-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-translate-z-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-translate-z-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-translate-z-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">


</div>

<div id="element-rotate-div" style="width: 100%;">
<label id="element-rotate" style="width: 45% !important;">RotateZ (deg):</label>

<input type="number" id="element-rotate-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-rotate-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-rotate-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-rotate-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-rotate-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div style="width: 100%;">
<label style="width: 45% !important;">RotateY (deg):</label>

<input type="number" id="element-rotate-Y-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-rotate-Y-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-rotate-Y-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-rotate-Y-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-rotate-Y-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">

</div>

<div style="width: 100%;">
<label style="width: 45% !important;">RotateX (deg):</label>

<input type="number" id="element-rotate-X-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-rotate-X-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-rotate-X-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-rotate-X-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-rotate-X-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">

</div>

<div id="element-scale-x-div" style="width: 100%;">
<label id="element-scale" style="width: 45% !important;">ScaleX (%):</label>

<input type="number" id="element-scale-x-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-scale-x-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-scale-x-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-scale-x-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-scale-x-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div id="element-scale-y-div" style="width: 100%;">
<label id="element-scale" style="width: 45% !important;">ScaleY (%):</label>

<input type="number" id="element-scale-y-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-scale-y-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-scale-y-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-scale-y-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-scale-y-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div style="width: 100%;">
<label style="width: 45% !important;">ScaleZ (%):</label>

<input type="number" id="element-scale-z-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-scale-z-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-scale-z-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-scale-z-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-scale-z-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">

</div>

<div id="element-skew-x-div" style="width: 100%;">
<label id="element-skew-x" style="width: 45% !important;">Skew-x (deg):</label>

<input type="number" id="element-skew-x-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-skew-x-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-skew-x-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-skew-x-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-skew-x-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div id="element-skew-y-div" style="width: 100%;">
<label id="element-skew-y" style="width: 45% !important;">Skew-y (deg):</label>

<input type="number" id="element-skew-y-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-skew-y-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-skew-y-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-skew-y-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-skew-y-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">
</div>

<div style="width: 100%;">
<label style="width: 45% !important;">Perspective (px):</label>

<input type="number" id="element-perspective-Input" value="" step="1" style="width: 50% !important;" class="base-mode">

<input type="number" id="element-perspective-Input-hover" value="" step="1" style="width: 50% !important;" class="hover-mode">

<input type="number" id="element-perspective-Input-active" value="" step="1" style="width: 50% !important;" class="active-mode">

<input type="number" id="element-perspective-Input-tablet" value="" step="1" style="width: 50% !important;" class="tablet-mode">

<input type="number" id="element-perspective-Input-mobile" value="" step="1" style="width: 50% !important;" class="mobile-mode">

</div>

<div style="width: 100%;">

<label style="width: 60% !important;">Perspective Origin X(%):</label>

<input type="number" id="element-perspective-origin-x-Input" value="" step="1" style="width: 35% !important;" class="base-mode">

<input type="number" id="element-perspective-origin-x-Input-hover" value="" step="1" style="width: 35% !important;" class="hover-mode">

<input type="number" id="element-perspective-origin-x-Input-active" value="" step="1" style="width: 35% !important;" class="active-mode">

<input type="number" id="element-perspective-origin-x-Input-tablet" value="" step="1" style="width: 35% !important;" class="tablet-mode">

<input type="number" id="element-perspective-origin-x-Input-mobile" value="" step="1" style="width: 35% !important;" class="mobile-mode">

</div>

<div style="width: 100%;">

<label style="width: 60% !important;">Perspective Origin Y(%):</label>

<input type="number" id="element-perspective-origin-y-Input" value="" step="1" style="width: 35% !important;" class="base-mode">

<input type="number" id="element-perspective-origin-y-Input-hover" value="" step="1" style="width: 35% !important;" class="hover-mode">

<input type="number" id="element-perspective-origin-y-Input-active" value="" step="1" style="width: 35% !important;" class="active-mode">

<input type="number" id="element-perspective-origin-y-Input-tablet" value="" step="1" style="width: 35% !important;" class="tablet-mode">

<input type="number" id="element-perspective-origin-y-Input-mobile" value="" step="1" style="width: 35% !important;" class="mobile-mode">

</div>

<div id="element-matrix-div" style="width: 100%;">
<label id="element-matrix" style="width: 45% !important;">Matrix :</label>

<input type="text" placeholder="1, 0.5, -0.5, 1, 0, 0" id="element-matrix-Input" value="" style="width: 50% !important;" class="base-mode">

<input type="text" placeholder="1, 0.5, -0.5, 1, 0, 0" id="element-matrix-Input-hover" value="" style="width: 50% !important;" class="hover-mode">

<input type="text" placeholder="1, 0.5, -0.5, 1, 0, 0" id="element-matrix-Input-active" value="" style="width: 50% !important;" class="active-mode">

<input type="text" placeholder="1, 0.5, -0.5, 1, 0, 0" id="element-matrix-Input-tablet" value="" style="width: 50% !important;" class="tablet-mode">

<input type="text" placeholder="1, 0.5, -0.5, 1, 0, 0" id="element-matrix-Input-mobile" value="" style="width: 50% !important;" class="mobile-mode">
</div>


</div>


</div>
<hr inputid="inputid106" fieldid="field106" style="border-top: 1px solid rgba(255, 255, 255, 0.35); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormTransform };

const editFormTransition = `
<div id="elementTransition" class="base-mode">
<label style="width: 45% !important;">Transition : </label>
<input type="number" id="element-transition-Input" max="50000" value="" step="0.1" style="width: 50% !important;">
</div>`;
export {editFormTransition};

//==========================
const editFormVisibility = `<div id="elementVisibility" inputid="inputid101" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100%; opacity: 1;">
<label id="elementVisibilitylabel" for="Visibility" labelid="label101" style="width: 90% !important;">
Visibility</label>
<input fieldid="field101" type="checkbox" id="Check-Element-Visibility-Input" name="Visibility" style="width: 10% !important;">
</div>
<div id="elementHide On Desktop" inputid="inputid103" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100% !important; opacity: 1;">
<label id="elementHide On Desktoplabel" for="Hide On Desktop" labelid="label103" style="width: 50% !important;">
Hide On Desktop</label>
<input fieldid="field103" type="checkbox" id="element-Hide-On-Desktop-Input" name="Hide On Desktop" style="width: 50% !important;">
</div>
<div id="elementHide On Mobile" inputid="inputid105" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100% !important; opacity: 1;">
<label id="elementHide On Mobilelabel" for="Hide On Mobile" labelid="label105" style="width: 50% !important;">
Hide On Mobile</label>
<input fieldid="field105" type="checkbox" id="element-Hide-On-Mobile-Input" name="Hide On Mobile" style="width: 50% !important;">
</div>
<div id="elementHide On Tablet" inputid="inputid104" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100%; opacity: 1;">
<label id="elementHide On Tabletlabel" for="Hide On Tablet" labelid="label104" style="width: 50% !important;">
Hide On Tablet</label>
<input fieldid="field104" type="checkbox" id="element-Hide-On-Tablet-Input" name="Hide On Tablet" style="width: 50% !important;">
</div>
<hr inputid="inputid107" fieldid="field107" style="border-top: 1px solid rgba(252, 252, 252, 0.46); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormVisibility };
//==========================
const editFormAdditionalCSS = `<div id="elementCustom CSS" inputid="inputid108" style="width: 100%;">
<label id="elementCustom CSSlabel" for="Custom CSS" labelid="label108" style="width: 100% !important;">
Additional CSS :</label>
<textarea fieldid="field108" id="element-Custom-CSS-Input" name="Custom CSS" placeholder="input your Additional CSS here" rows="6" style="width: 100% !important;" class="base-mode">
</textarea>

<textarea fieldid="field108" id="element-Custom-CSS-Input-hover" name="Custom CSS" placeholder="input your Additional CSS here" rows="6" style="width: 100% !important;" class="hover-mode">
</textarea>

<textarea fieldid="field108" id="element-Custom-CSS-Input-active" name="Custom CSS" placeholder="input your Additional CSS here" rows="6" style="width: 100% !important;" class="active-mode">
</textarea>

<textarea fieldid="field108" id="element-Custom-CSS-Input-tablet" name="Custom CSS" placeholder="input your Additional CSS here" rows="6" style="width: 100% !important;" class="tablet-mode">  </textarea>

<textarea fieldid="field108" id="element-Custom-CSS-Input-mobile" name="Custom CSS" placeholder="input your Additional CSS here" rows="6" style="width: 100% !important;" class="mobile-mode">
</textarea>

</div>
<hr inputid="inputid109" fieldid="field109" style="border-top: 1px solid rgba(255, 255, 255, 0.47); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
`;
export { editFormAdditionalCSS };

//==========================
const editCustomCSS = `<div style="width: 100%;">
</div>
<div class="ProjectSettingz" > <p>Custom CSS</p><hr class="white-hr">
<button id="element-Custom-cssCode-Input">Edit Custom CSS</></button><hr class="white-hr">
</div>

`;
export { editCustomCSS };
//==========================
const editFormCustomJavascript = `
<div class="ProjectSettingz" > <p>Custom JS</p><hr class="white-hr">
<button id="element-Custom-Javascript-Input">Edit Custom JS</></button><hr class="white-hr">
</div>
`;
export { editFormCustomJavascript };
//==========================
const editFormUsecolorPalatte = `<div id="elementCustomColorPalatte" inputid="inputid113" style="width: 50% !important;">
<button id= "Color-Palatte-edit" button="113" style="width: 100%; font-size: 11px;" class="base-mode">
Use Color Palatte</button>

<button id= "Color-Palatte-edit" button="113" style="width: 100%; font-size: 11px;" class="tablet-mode">
Use Color Palatte</button>

<button id= "Color-Palatte-edit" button="113" style="width: 100%; font-size: 11px;" class="mobile-mode">
Use Color Palatte</button>

</div>`;
export { editFormUsecolorPalatte };
//==========================
const editUseFormColorEditor = `<div id="Color-Editor-edit-div" inputid="inputid113" style="width: 100% !important;  transform: scale(0); display: none !important;">
<button id= "Color-Editor-edit" button="113" style="width: 50%; font-size: 11px;" class="base-mode">
Use Color Editor</button>

<button id= "Color-Editor-edit" button="113" style="width: 50%; font-size: 11px;" class="tablet-mode">
Use Color Editor</button>

<button id= "Color-Editor-edit" button="113" style="width: 50%; font-size: 11px;" class="mobile-mode">
Use Color Editor</button>

</div>`;
export { editUseFormColorEditor };

//-----------------------------------------------------------------------------------
//==================================================================================================

function Color_Palatte_Editor(idTarget,
    databg,dataop,dataresult,
    inputbg,inputop,inputresult,
    idName,parent,whereToPut){
    
    let elementPalatte = document.createElement('DIV');
    elementPalatte.id = "elementCustomColorPalatte";
    elementPalatte.style.width = "50% !important";
    let parentElement = document.getElementById(parent);
    let toPut = document.getElementById(whereToPut);
    parentElement.insertBefore(elementPalatte, toPut);
    let idBase = idName;
    let idHover = idName + "-hover";
    let idActive = idName + "-active";
    let idTablet = idName + "-tablet";
    let idMobile = idName + "-mobile";
    //-----------------------------------------
    let elementEdtior = document.createElement('DIV');
    elementEdtior.id = "Color-Editor-edit-div";
    parentElement.insertBefore(elementEdtior, toPut);
    elementEdtior.style.transform = "scale(0)";
    elementEdtior.style.display = "none";
    elementEdtior.style.width = "50% !important";
    let idBase2 = idName+ "-editor"+ numberPalatte;
    let idHover2 = idName + "-editor-hover"+ numberPalatte;
    let idActive2 = idName + "-editor-active"+ numberPalatte;
    let idTablet2 = idName + "-editor-tablet"+ numberPalatte;
    let idMobile2 = idName + "-editor-mobile"+ numberPalatte;


    let button = `
    <button id= "${idBase}" style="width: 50%; font-size: 11px;" class="base-mode">
    Use Color Palatte
    </button>
    
    <button id= "${idHover}" style="width: 50%; font-size: 11px;" class="hover-mode">
    Use Color Palatte
    </button>

    <button id= "${idActive}" style="width: 50%; font-size: 11px;" class="active-mode">
    Use Color Palatte
    </button>

    <button id= "${idTablet}" style="width: 50%; font-size: 11px;" class="tablet-mode">
    Use Color Palatte
    </button>

    <button id= "${idMobile}" style="width: 50%; font-size: 11px;" class="mobile-mode">
    Use Color Palatte
    </button>
    `
    elementPalatte.innerHTML = button;
//=================================================================
    let button2 = `
    <button id= "${idBase2}"style="width: 50%; font-size: 11px;" class="base-mode">
    Use Color Editor</button>

    <button id= "${idHover2}"style="width: 50%; font-size: 11px;" class="hover-mode">
    Use Color Editor</button>

    <button id= "${idActive2}"style="width: 50%; font-size: 11px;" class="active-mode">
    Use Color Editor</button>
    
    <button id= "${idTablet2}"style="width: 50%; font-size: 11px;" class="tablet-mode">
    Use Color Editor</button>
    
    <button id= "${idMobile2}"style="width: 50%; font-size: 11px;" class="mobile-mode">
    Use Color Editor</button>
    `
    elementEdtior.innerHTML = button2;

    document.getElementById(idBase).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbgOpac(
                idTarget,databg,dataop,dataresult,
                inputresult,inputbg,inputop,
                idBase,idBase2,idBase2); 
          });
          document.getElementById(idHover).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbgOpac(
                idTarget,databg+"-hover",dataop+"-hover",dataresult+"-hover",
                inputresult+"-hover",inputbg+"-hover",inputop+"-hover",
                idHover,idHover2,idHover2); 
          });
          document.getElementById(idActive).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbgOpac(
                idTarget,databg+"-active",dataop+"-active",dataresult+"-active",
                inputresult+"-active",inputbg+"-active",inputop+"-active",
                idActive,idActive2,idActive2); 
          });
          document.getElementById(idTablet).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbgOpac(
                idTarget,databg+"-tablet",dataop+"-tablet",dataresult+"-tablet",
                inputresult+"-tablet",inputbg+"-tablet",inputop+"-tablet",
                idTablet,idTablet2,idTablet2); 
          });
          document.getElementById(idMobile).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbgOpac(
                idTarget,databg+"-mobile",dataop+"-mobile",dataresult+"-mobile",
                inputresult+"-mobile",inputbg+"-mobile",inputop+"-mobile",
                idMobile,idMobile2,idMobile2); 
          });


        document.getElementById(idBase2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbgOpac(
                inputbg,inputop,
                idBase,idBase2);
          });
          document.getElementById(idHover2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbgOpac(
                inputbg+"-hover",inputop+"-hover",
                idHover,idHover2);
          });
          document.getElementById(idActive2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbgOpac(
                inputbg+"-active",inputop+"-active",
                idActive,idActive2);
          });
          document.getElementById(idTablet2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbgOpac(
                inputbg+"-tablet",inputop+"-tablet",
                idTablet,idTablet2);
          });
          document.getElementById(idMobile2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbgOpac(
                inputbg+"-mobile",inputop+"-mobile",
                idMobile,idMobile2);
          });
          numberPalatte += 1;
}
export { Color_Palatte_Editor };

function Color_Palatte_Editor_withoutOP(
    idTarget,datacolor,
    inputbg,inputbgDiv,
    idName,parent,whereToPut){
    
    let elementPalatte = document.createElement('DIV');
    elementPalatte.id = "elementCustomColorPalatte";
    elementPalatte.style.width = "50% !important";
    let parentElement = document.getElementById(parent);
    let toPut = document.getElementById(whereToPut);
    parentElement.insertBefore(elementPalatte, toPut);
    let idBase = idName;
    let idHover = idName + "-hover";
    let idActive = idName + "-active";
    let idTablet = idName + "-tablet";
    let idMobile = idName + "-mobile";
    //-----------------------------------------
    let elementEdtior = document.createElement('DIV');
    elementEdtior.id = "Color-Editor-edit-div2";
    parentElement.insertBefore(elementEdtior, toPut);
    elementEdtior.style.transform = "scale(0)";
    elementEdtior.style.display = "none";
    elementEdtior.style.width = "50% !important";
    let idBase2 = idName+ "-editor" + numberPalatte;
    let idHover2 = idName + "-editor-hover" + numberPalatte;
    let idActive2 = idName + "-editor-active" + numberPalatte;
    let idTablet2 = idName + "-editor-tablet" + numberPalatte;
    let idMobile2 = idName + "-editor-mobile" + numberPalatte;


    let button = `
    <button id= "${idBase}" style="width: 50%; font-size: 11px;" class="base-mode">
    Use Color Palatte
    </button>

    <button id= "${idHover}" style="width: 50%; font-size: 11px;" class="hover-mode">
    Use Color Palatte
    </button>

    <button id= "${idActive}" style="width: 50%; font-size: 11px;" class="active-mode">
    Use Color Palatte
    </button>
    
    <button id= "${idTablet}" style="width: 50%; font-size: 11px;" class="tablet-mode">
    Use Color Palatte
    </button>

    <button id= "${idMobile}" style="width: 50%; font-size: 11px;" class="mobile-mode">
    Use Color Palatte
    </button>
    `
    elementPalatte.innerHTML = button;
//=================================================================
    let button2 = `
    <button id= "${idBase2}"style="width: 50%; font-size: 11px;" class="base-mode">
    Use Color Editor</button>

    <button id= "${idHover2}"style="width: 50%; font-size: 11px;" class="hover-mode">
    Use Color Editor</button>

    <button id= "${idActive2}"style="width: 50%; font-size: 11px;" class="active-mode">
    Use Color Editor</button>
    
    <button id= "${idTablet2}"style="width: 50%; font-size: 11px;" class="tablet-mode">
    Use Color Editor</button>
    
    <button id= "${idMobile2}"style="width: 50%; font-size: 11px;" class="mobile-mode">
    Use Color Editor</button>
    `
    elementEdtior.innerHTML = button2;

    document.getElementById(idBase).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbg(
                idTarget,datacolor,
                inputbg,inputbgDiv,
                idBase,idBase2,idBase2); 
          });
          document.getElementById(idHover).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbg(
                idTarget,datacolor+"-hover",
                inputbg+"-hover",inputbgDiv+"-hover",
                idHover,idHover2,idHover2,);
          });
          document.getElementById(idActive).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbg(
                idTarget,datacolor+"-active",
                inputbg+"-active",inputbgDiv+"-active",
                idActive,idActive2,idActive2,);
          });
          document.getElementById(idTablet).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbg(
                idTarget,datacolor+"-tablet",
                inputbg+"-tablet",inputbgDiv+"-tablet",
                idTablet,idTablet2,idTablet2,);
          });
          document.getElementById(idMobile).addEventListener("click", function(event) {
            event.preventDefault();
            openColorPalateElementbg(
                idTarget,datacolor+"-mobile",
                inputbg+"-mobile",inputbgDiv+"-mobile",
                idMobile,idMobile2,idMobile2,);
          });


        document.getElementById(idBase2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbg(
                inputbgDiv,
                idBase,idBase2);
          });
          document.getElementById(idHover2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbg(
                inputbgDiv+"-hover",
                idHover,idHover2);
          });
          document.getElementById(idActive2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbg(
                inputbgDiv+"-active",
                idActive,idActive2);
          });
          document.getElementById(idTablet2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbg(
                inputbgDiv+"-tablet",
                idTablet,idTablet2);
          });
          document.getElementById(idMobile2).addEventListener("click", function(event) {
            event.preventDefault();
            openColorEditorbg(
                inputbgDiv+"-mobile",
                idMobile,idMobile2);
          });
          numberPalatte += 1;
}
export { Color_Palatte_Editor_withoutOP };

function classmode(){
    let currentDiv = document.getElementById('class-mode');
    if(currentDiv){
      currentDiv.remove();
    }
    let parentElement = document.getElementById("menu-controller");
    let div = document.createElement("DIV");
    let sibiling = document.getElementById("menu-tab");
    div.id = "class-mode"
    let content = `
    <div id="device-mode">
    <i class="fa-solid fa-display icon-device" title="desktop" id="click-desktop"></i>
    <i class="fa-solid fa-tablet-screen-button icon-device"title="tablet" id="click-tablet"></i>
    <i class="fa-solid fa-mobile-screen icon-device"title="mobile"id="click-mobile"></i>
    <i class="fa-solid fa-computer-mouse icon-device"title="hover"id="click-hover"></i>
    <i class="fa-solid fa-arrow-pointer icon-device"title="active" id="click-active"></i>
    </div>
    <div id="text-mode">Desktop</div>
  `
  
  parentElement.insertBefore(div, sibiling);
  div.innerHTML = content;
  addEventListeneropen();

}
export { classmode };

  function addEventListeneropen(){
    let desktopButton = document.getElementById("click-desktop");
    let hoverButton = document.getElementById("click-hover");
    let activeButton = document.getElementById("click-active");
    let tabletButton = document.getElementById("click-tablet");
    let mobileButton = document.getElementById("click-mobile");

    desktopButton.addEventListener("click", openDesktop);
    hoverButton.addEventListener("click", openHover);
    activeButton.addEventListener("click", openActive);
    tabletButton.addEventListener("click", openTablet);
    mobileButton.addEventListener("click", openMobile);
    toggleIconDevice();
  }

  export { addEventListeneropen };

  function toggleIconDevice() {
    let desktopButton = document.getElementById("click-desktop");
    let hoverButton = document.getElementById("click-hover");
    let activeButton = document.getElementById("click-active");
    let tabletButton = document.getElementById("click-tablet");
    let mobileButton = document.getElementById("click-mobile");
    let elements = [desktopButton, hoverButton, activeButton, tabletButton, mobileButton];
    gsap.to(desktopButton, {
      backgroundColor: "#070707a1",
          color: "rgba(0, 255, 255, 0.842)",
          border: "1px solid rgba(0, 255, 255, 0.842)",
          duration: 0.1,
    });
  
    elements.forEach(icon => {
      icon.addEventListener("click", () => {

        elements.forEach(icon => {
          gsap.to(icon, {
            backgroundColor: "rgba(0, 255, 255, 0.842)",
            color: "#070707",
            border: "1px solid rgba(0, 255, 255, 0)",
            duration: 0.1,
          });
        });
        //==============
        gsap.to(icon, {
          backgroundColor: "#070707a1",
          color: "rgba(0, 255, 255, 0.842)",
          border: "1px solid rgba(0, 255, 255, 0.842)",
          duration: 0.1,
        });
      });
    });
    //=============================
    document.getElementById("Layout-Editor").addEventListener("click", function(){
      elements.forEach(icon => {
        gsap.to(icon, {
          backgroundColor: "rgba(0, 255, 255, 0.842)",
          color: "#070707",
          border: "1px solid rgba(0, 255, 255, 0)",
          duration: 0.1,
        });
      }); toggleIconDevice();
        });
      document.getElementById("Style-Editor").addEventListener("click", function(){
        elements.forEach(icon => {
          gsap.to(icon, {
            backgroundColor: "rgba(0, 255, 255, 0.842)",
            color: "#070707",
            border: "1px solid rgba(0, 255, 255, 0)",
            duration: 0.1,
          });
        }); toggleIconDevice();
        });
      document.getElementById("Advance-Editor").addEventListener("click", function(){
        elements.forEach(icon => {
          gsap.to(icon, {
            backgroundColor: "rgba(0, 255, 255, 0.842)",
            color: "#070707",
            border: "1px solid rgba(0, 255, 255, 0)",
            duration: 0.1,
          });
        }); toggleIconDevice();
        });

  }
  
  

function openDesktop() {
  let previewbefore = document.getElementById("headicon-preview");
  if(previewbefore){
    previewbefore.remove();
  }
  let headmenu = document.querySelector("#head-menu-controller");
  let closemenubutton = document.querySelector("#close-menu");
  //------------------------------------------------
  let newButton = document.createElement("BUTTON");
  newButton.id = "headicon-preview"
  headmenu.insertBefore(newButton, closemenubutton);
  newButton.addEventListener("click", changeviewport2);
  //------------------------------------------------
  let headicon = document.createElement("I");
  headicon.setAttribute("class","fas fa-display");
//----------------------------------------------
  let headicontext = document.createElement("P");
  headicontext.id = "headicontext";
  headicontext.textContent = "preview";
//----------------------------------------------
  newButton.appendChild(headicon);
  newButton.appendChild(headicontext);
//----------------------------------------------

let content = document.getElementById("text-mode");
gsap.to(content, {opacity: 0, duration: 0.1, onComplete: function(){
  content.textContent = "Desktop";
  gsap.to(content, {opacity: 1, duration: 0.1,});
}});
let desktop = document.querySelectorAll(".base-mode");
let hover = document.querySelectorAll(".hover-mode");
let active = document.querySelectorAll(".active-mode");
let tablet = document.querySelectorAll(".tablet-mode");
let mobile = document.querySelectorAll(".mobile-mode");
    for (let i = 0; i < desktop.length; i++) {
      desktop[i].classList.remove("none-mode");
    }
    for (let i = 0; i < hover.length; i++) {
      hover[i].classList.add("none-mode");
    }
    for (let i = 0; i < active.length; i++) {
      active[i].classList.add("none-mode");
    }
    for (let i = 0; i < tablet.length; i++) {
      tablet[i].classList.add("none-mode");
    }
    for (let i = 0; i < mobile.length; i++) {
      mobile[i].classList.add("none-mode");
    }
  }

  export { openDesktop };

  function openHover() {
    let previewbefore = document.getElementById("headicon-preview");
  if(previewbefore){
    previewbefore.remove();
  }
  let headmenu = document.querySelector("#head-menu-controller");
  let closemenubutton = document.querySelector("#close-menu");
  //------------------------------------------------
  let newButton = document.createElement("BUTTON");
  newButton.id = "headicon-preview"
  headmenu.insertBefore(newButton, closemenubutton);
  newButton.addEventListener("click", changeviewport2);
  //------------------------------------------------
  let headicon = document.createElement("I");
  headicon.setAttribute("class","fas fa-display");
//----------------------------------------------
  let headicontext = document.createElement("P");
  headicontext.id = "headicontext";
  headicontext.textContent = "preview";
//----------------------------------------------
  newButton.appendChild(headicon);
  newButton.appendChild(headicontext);
//----------------------------------------------

    let content = document.getElementById("text-mode");
    gsap.to(content, {opacity: 0, duration: 0.1, onComplete: function(){
      content.textContent = "Hover";
      gsap.to(content, {opacity: 1, duration: 0.1,});
    }});
let desktop = document.querySelectorAll(".base-mode");
let hover = document.querySelectorAll(".hover-mode");
let active = document.querySelectorAll(".active-mode");
let tablet = document.querySelectorAll(".tablet-mode");
let mobile = document.querySelectorAll(".mobile-mode");
    for (let i = 0; i < desktop.length; i++) {
      desktop[i].classList.add("none-mode");
    }
    for (let i = 0; i < hover.length; i++) {
      hover[i].classList.remove("none-mode");
    }
    for (let i = 0; i < active.length; i++) {
      active[i].classList.add("none-mode");
    }
    for (let i = 0; i < tablet.length; i++) {
      tablet[i].classList.add("none-mode");
    }
    for (let i = 0; i < mobile.length; i++) {
      mobile[i].classList.add("none-mode");
    }
      }
    
      export { openHover };

function openActive() {
  let previewbefore = document.getElementById("headicon-preview");
  if(previewbefore){
    previewbefore.remove();
  }
  let headmenu = document.querySelector("#head-menu-controller");
  let closemenubutton = document.querySelector("#close-menu");
  //------------------------------------------------
  let newButton = document.createElement("BUTTON");
  newButton.id = "headicon-preview"
  headmenu.insertBefore(newButton, closemenubutton);
  newButton.addEventListener("click", changeviewport2);
  //------------------------------------------------
  let headicon = document.createElement("I");
  headicon.setAttribute("class","fas fa-display");
//----------------------------------------------
  let headicontext = document.createElement("P");
  headicontext.id = "headicontext";
  headicontext.textContent = "preview";
//----------------------------------------------
  newButton.appendChild(headicon);
  newButton.appendChild(headicontext);
//----------------------------------------------

  let content = document.getElementById("text-mode");
gsap.to(content, {opacity: 0, duration: 0.1, onComplete: function(){
  content.textContent = "Active";
  gsap.to(content, {opacity: 1, duration: 0.1,});
}});  
  let desktop = document.querySelectorAll(".base-mode");
  let hover = document.querySelectorAll(".hover-mode");
  let active = document.querySelectorAll(".active-mode");
  let tablet = document.querySelectorAll(".tablet-mode");
  let mobile = document.querySelectorAll(".mobile-mode");
      for (let i = 0; i < desktop.length; i++) {
        desktop[i].classList.add("none-mode");
      }
      for (let i = 0; i < hover.length; i++) {
        hover[i].classList.add("none-mode");
      }
      for (let i = 0; i < active.length; i++) {
        active[i].classList.remove("none-mode");
      }
      for (let i = 0; i < tablet.length; i++) {
        tablet[i].classList.add("none-mode");
      }
      for (let i = 0; i < mobile.length; i++) {
        mobile[i].classList.add("none-mode");
      }
      }
    
      export { openActive };

  function openTablet(){
    let previewbefore = document.getElementById("headicon-preview");
  if(previewbefore){
    previewbefore.remove();
  }
  let headmenu = document.querySelector("#head-menu-controller");
  let closemenubutton = document.querySelector("#close-menu");
  //------------------------------------------------
  let newButton = document.createElement("BUTTON");
  newButton.id = "headicon-preview"
  headmenu.insertBefore(newButton, closemenubutton);
  newButton.addEventListener("click", ()=>{

    changeviewport2(tabletResponsiveBreakPoint);

  });
  //------------------------------------------------
  let headicon = document.createElement("I");
  headicon.setAttribute("class","fas fa-tablet-screen-button");
//----------------------------------------------
  let headicontext = document.createElement("P");
  headicontext.id = "headicontext";
  headicontext.textContent = "preview";
//----------------------------------------------
  newButton.appendChild(headicon);
  newButton.appendChild(headicontext);
//----------------------------------------------

    let content = document.getElementById("text-mode");
    gsap.to(content, {opacity: 0, duration: 0.1, onComplete: function(){
      content.textContent = "Tablet";
      gsap.to(content, {opacity: 1, duration: 0.1,});
    }});
    let desktop = document.querySelectorAll(".base-mode");
let hover = document.querySelectorAll(".hover-mode");
let active = document.querySelectorAll(".active-mode");
let tablet = document.querySelectorAll(".tablet-mode");
let mobile = document.querySelectorAll(".mobile-mode");
    for (let i = 0; i < desktop.length; i++) {
      desktop[i].classList.add("none-mode");
    }
    for (let i = 0; i < hover.length; i++) {
      hover[i].classList.add("none-mode");
    }
    for (let i = 0; i < active.length; i++) {
      active[i].classList.add("none-mode");
    }
    for (let i = 0; i < tablet.length; i++) {
      tablet[i].classList.remove("none-mode");
    }
    for (let i = 0; i < mobile.length; i++) {
      mobile[i].classList.add("none-mode");
    }
  }

  function openMobile(){

    let previewbefore = document.getElementById("headicon-preview");
    if(previewbefore){
      previewbefore.remove();
    }
    let headmenu = document.querySelector("#head-menu-controller");
    let closemenubutton = document.querySelector("#close-menu");
    //------------------------------------------------
    let newButton = document.createElement("BUTTON");
    newButton.id = "headicon-preview"
    headmenu.insertBefore(newButton, closemenubutton);
    newButton.addEventListener("click", ()=>{
  
      changeviewport2(mobileResponsiveBreakPoint);
  
    });
    //------------------------------------------------
    let headicon = document.createElement("I");
    headicon.setAttribute("class","fas fa-mobile-screen");
  //----------------------------------------------
    let headicontext = document.createElement("P");
    headicontext.id = "headicontext";
    headicontext.textContent = "preview";
  //----------------------------------------------
    newButton.appendChild(headicon);
    newButton.appendChild(headicontext);
  //----------------------------------------------

    let content = document.getElementById("text-mode");
gsap.to(content, {opacity: 0, duration: 0.1, onComplete: function(){
  content.textContent = "Mobile";
  gsap.to(content, {opacity: 1, duration: 0.1,});
}});

    let desktop = document.querySelectorAll(".base-mode");
    let hover = document.querySelectorAll(".hover-mode");
    let active = document.querySelectorAll(".active-mode");
    let tablet = document.querySelectorAll(".tablet-mode");
    let mobile = document.querySelectorAll(".mobile-mode");
        for (let i = 0; i < desktop.length; i++) {
          desktop[i].classList.add("none-mode");
        }
        for (let i = 0; i < hover.length; i++) {
          hover[i].classList.add("none-mode");
        }
        for (let i = 0; i < active.length; i++) {
          active[i].classList.add("none-mode");
        }
        for (let i = 0; i < tablet.length; i++) {
          tablet[i].classList.add("none-mode");
        }
        for (let i = 0; i < mobile.length; i++) {
          mobile[i].classList.remove("none-mode");
        }
  }

  //=== Content Pada Element
  // Title and More
  const editFormeditAlternativeText = `<div class="base-mode" id="editAlternativeText" inputid="inputid9" style="width: 100%;">
<label id="editAlternativeTextlabel" for="Alt" labelid="label9" style="width: 45% !important;">
Alt :</label>
<input fieldid="field9" type="text" id="editAlternativeTextinput" name="Alt" style="width: 50% !important;">
</div>`;
export { editFormeditAlternativeText };

const editFormeditEditonClickLink = `<div class="" id="EditonClickLink" inputid="inputid10" style="width: 100%;">
<label id="EditonClickLinklabel" for="onClickLink" labelid="label10" style="width: 45% !important;">
Link :</label>
<input fieldid="field10" type="text" id="EditonClickLinkinput" name="onClickLink" style="width: 50% !important;">
</div>

<div class="" id="targetBlank-lazydev" inputid="inputid10" style="width: 100%;">

<label id="EditonClickLinklabel" for="onClickLink" labelid="label10" style="width: 45% !important;">
Target :</label>

<select id="lazydev-target-blank" style="width: 50% !important;>
  <option value=""></option>
  <option value=""></option>
  <option value="_blank">_blank</option>
</select>

</div>
`;
export { editFormeditEditonClickLink };

export const editOnClickEvent = `
<div class="" id="EditonClickLink" inputid="inputid10" style="width: 100%;">
<label id="EditonClickLinklabel" for="onClickLink" labelid="label10" style="width: 45% !important;">
OnClick :</label>
<input fieldid="field10" type="text" id="edit-onClickEvent" name="onClickLink" style="width: 50% !important;">
</div>`

const editFormeditTitleElement = `<div class="base-mode" id="editTitleElement" inputid="inputid11" style="width: 100%;">
<label id="editTitleElementlabel" for="editTitleElement" labelid="label11" style="width: 45% !important;">
Title :</label>
<input fieldid="field11" type="text" id="editTitleElementinput" name="editTitleElement" style="width: 50% !important;">
</div>`;
export { editFormeditTitleElement };

//Text Content
const contentText =
`
<div style="width: 100% !important;">
<label for="contentTextInputText" style="width: 100% !important;">Content Text</label>
<input type="text" id="contentTextInputText" style="width: 100% !important;">
</div>

`;
export {contentText};

//UL
const innerHTMLUL = 
`
<div style="width: 100% !important;">
<label for="edit-innerhtml-ul-input" style="width: 100% !important;">Unordered List Content :<hr> </label>
<textarea class="ul-textarea" id="edit-innerhtml-ul-input" rows="8" style="width: 100% !important;">

</textarea>
</div>

`; export {innerHTMLUL};

//IFrame
const editSource =
`
<div style="width: 100% !important;">
<label for="label-for-input" style="width: 45% !important;">Source : </label>
<input type="text" id="edit-source-input" style="width: 50% !important;">
</div>

`;
export {editSource};

const embedSourceType =
`
<div style="width: 100% !important;">
<label for="label-for-input" style="width: 45% !important;">Source Type : </label>
<input type="text" id="embed-sourcetype-input" style="width: 50% !important;">
</div>

`;
export {embedSourceType};

const editScrolling =
`
<div style="width: 100% !important;">
<label style="width: 45% !important;">Scrolling : </label>
<input type="text" id="embed-scrolling-input" style="width: 50% !important;">
</div>

`;

export {editScrolling};

const editFrameBorder =
`
<div style="width: 100% !important;">
<label style="width: 45% !important;">Frameborder : </label>
<input type="number" id="embed-frameborder-input" style="width: 50% !important;">
</div>

`;

export {editFrameBorder};

const checkControl =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Enable Controls</label>
<input type="checkbox" id="embed-controls-input" style="width: 5%;">
</div>
`; export {checkControl};

const checkAutoPlay =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Enable Autoplay</label>
<input type="checkbox" id="embed-autoplay-input" style="width: 5%;">
</div>
`; export {checkAutoPlay};

const checkLoop =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Enable Loops</label>
<input type="checkbox" id="embed-loop-input" style="width: 5%;">
</div>
`; export {checkLoop};

const checkFullscreen =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Allow Fullscreen </label>
<input type="checkbox" id="embed-allowfullscreen-input" style="width: 5%;">
</div>
`; export {checkFullscreen};

// Input dan Label

const labelFor =
`
<div style="width: 50% !important;">
<label for="label-for-input" style="width: 100% !important;">For : </label>
<input type="text" id="label-for-input" style="width: 100% !important;">
</div>

`;
export {labelFor};

const editAccesKey =
`
<div style="width: 50% !important;">
<label for="label-acceskey-input" style="width: 100% !important;">Accesskey : </label>
<input type="text" id="label-acceskey-input" style="width: 100% !important;">
</div>

`;
export {editAccesKey};

const htmlContent = `
<div style="width: 105% !important;">
<label style="width: 100% !important;">inner-html : <hr></label>
<textarea class="ul-textarea" id="html-inner-content" style="width: 100% !important;" >
</textarea>
`;
export {htmlContent};

const tableContent = `
<div style="width: 105% !important;">
<label style="width: 100% !important;">Table Content : <hr></label>
<textarea class="ul-textarea" rows="8" id="html-inner-content" style="width: 100% !important;" >
</textarea>
`;
export {tableContent};

//Table
const tableEditor = `
<hr style="border-top: 1px solid rgba(214, 214, 214, 0.48); margin: 5px 0px;">
<paragraph inputid="inputid3" fieldid="field3" style="font-size: 14px; margin-left: -2%; color: rgb(227, 227, 227);">
Table Styling</paragraph>
<hr style="border-top: 1px solid rgba(214, 214, 214, 0.48); margin: 5px 0px;">
<div id="border-collapse-" style="width: 100%;">
<label id="border-collapse-label" for="NewFIeld6" labelid="label6" style="width: 100% !important;">
Border-collapse :</label>

<select id="border-collapse-input" style="width: 100% !important;">
<option value="">
</option>
<option value="collapse">
collapse</option>
<option value="separate">
separate</option>
</select>

</div>

<div id="th-styling-" inputid="inputid7" style="width: 100%;">
<label id="th-styling-label" for="th-styling-" labelid="label7" style="width: 100% !important;">
Table Head Styling</label>

<textarea id="th-styling-input" name="th-styling-" rows="8" style="width: 100% !important;" class="base-mode"></textarea>

<textarea id="th-styling-input-hover" name="th-styling-" rows="8" style="width: 100% !important;" class="hover-mode"></textarea>

<textarea id="th-styling-input-active" name="th-styling-" rows="8" style="width: 100% !important;" class="active-mode"></textarea>

<textarea id="th-styling-input-tablet" name="th-styling-" rows="8" style="width: 100% !important;" class="tablet-mode"></textarea>

<textarea id="th-styling-input-mobile" name="th-styling-" rows="8" style="width: 100% !important;" class="mobile-mode"></textarea>


</div>
<div id="tr-styling-" inputid="inputid8" style="width: 100%;">
<label id="tr-styling-label" for="tr-styling-" labelid="label8" style="width: 100% !important;">
Table Row Styling</label>
<textarea id="tr-styling-input" name="tr-styling-" rows="8" style="width: 100% !important;" class="base-mode"></textarea>

<textarea id="tr-styling-input-hover" name="tr-styling-" rows="8" style="width: 100% !important;" class="hover-mode"></textarea>

<textarea id="tr-styling-input-active" name="tr-styling-" rows="8" style="width: 100% !important;" class="active-mode"></textarea>

<textarea id="tr-styling-input-tablet" name="tr-styling-" rows="8" style="width: 100% !important;" class="tablet-mode"></textarea>

<textarea id="tr-styling-input-mobile" name="tr-styling-" rows="8" style="width: 100% !important;" class="mobile-mode"></textarea>

</div>
<div id="td-styling-" inputid="inputid9" style="width: 100%;">
<label id="td-styling-label" for="td-styling-" labelid="label9" style="width: 100% !important;">
Table Cell Styling</label>

<textarea id="td-styling-input" name="td-styling-" rows="8" style="width: 100% !important;" class="base-mode"></textarea>

<textarea id="td-styling-input-hover" name="td-styling-" rows="8" style="width: 100% !important;" class="hover-mode"></textarea>

<textarea id="td-styling-input-active" name="td-styling-" rows="8" style="width: 100% !important;" class="active-mode"></textarea>

<textarea id="td-styling-input-tablet" name="td-styling-" rows="8" style="width: 100% !important;" class="tablet-mode"></textarea>

<textarea id="td-styling-input-mobile" name="td-styling-" rows="8" style="width: 100% !important;" class="mobile-mode"></textarea>

</div>
`;

export {tableEditor};


///===============================================
//Input

const editNameInput =
`
<div style="width: 100% !important;">
<label for="edit-name-input" style="width: 35% !important;">Name : </label>
<input type="text" id="edit-name-input" style="width: 60% !important;">
</div>

`;
export {editNameInput};

const editListStyle =
`
<div id="style-for-UL" style="width: 100% !important;">
<label for="edit-name-input" style="width: 50% !important;">List Style Type : </label>
<select fieldid="field2" id="edit-listStyle-input" name="NewFIeld2" style="width: 45% !important;">
<option value="">
</option>
<option value="none">
none</option>
<option value="circle">
circle</option>
<option value="square">
square</option>
</select>
</div>

<div id="style-for-OL" style="width: 100% !important;">
<label for="edit-name-input" style="width: 50% !important;">List Style Type : </label>
<select fieldid="field2" id="edit-listStyleOL-input" name="NewFIeld2" style="width: 45% !important;">
<option value="upper-roman">upper-roman
</option>
<option value="none">
none</option>
<option value="decimal">
Decimal</option>
<option value="lower-alpha">
lower-alpha</option>
<option value="upper-alpha">
upper-alpha</option>
</select>
</div>

<div id="list-style-image-" inputid="inputid3" style="width: 100%;">
<label id="list-style-image-label" for="list-style-image-" labelid="label3" style="width: 50% !important;">
List Image :</label>
<input fieldid="field3" type="text" id="list-style-image-input" name="list-style-image-" style="width: 45% !important;">
</div>
<div id="list-style-position-" inputid="inputid4" style="width: 100%;">
<label id="list-style-position-label" for="NewFIeld4" labelid="label4" style="width: 50% !important;">
List Position :</label>
<select fieldid="field4" id="list-style-position-input" name="NewFIeld4" style="width: 45% !important;">
<option value="">
</option>
<option value="inside">
inside</option>
<option value="outside">
outside</option>
</select>
</div>

`;
export {editListStyle};

const editPlaceHolderInput =
`
<div style="width: 100% !important;">
<label for="edit-placeholder-input" style="width: 35% !important;">Placeholder : </label>
<input type="text" id="edit-placeholder-input" style="width: 60% !important;">
</div>

`;
export {editPlaceHolderInput};
//-------------------------------
const editMinInput =
`
<div style="width: 100% !important;">
<label for="edit-min-input" style="width: 35% !important;">Min : </label>
<input type="number" id="edit-min-input" style="width: 60% !important;">
</div>

`;
export {editMinInput};
const editMaxPInput =
`
<div style="width: 100% !important;">
<label for="edit-max-input" style="width: 35% !important;">Max : </label>
<input type="number" id="edit-max-input" style="width: 60% !important;">
</div>

`;
export {editMaxPInput};
const editStepInput =
`
<div style="width: 100% !important;">
<label for="edit-step-input" style="width: 35% !important;">Step : </label>
<input type="number" id="edit-step-input" style="width: 60% !important;">
</div>

`;
export {editStepInput};

const editMaxLenghtInput =
`
<div style="width: 100% !important;">
<label for="edit-maxlenght-input" style="width: 35% !important;">Maxlenght : </label>
<input type="number" id="edit-maxlenght-input" style="width: 60% !important;">
</div>

`;
export {editMaxLenghtInput};

const editValueTextInput =
`
<div style="width: 100% !important;">
<label for="edit-value-text-input" style="width: 35% !important;">Value : </label>
<input type="text" id="edit-value-text-input" style="width: 60% !important;">
</div>

`;
export {editValueTextInput};

const editValueNumberInput =
`
<div style="width: 100% !important;">
<label for="edit-value-number-input" style="width: 35% !important;">Value : </label>
<input type="number" id="edit-value-number-input" style="width: 60% !important;">
</div>

`;
export {editValueNumberInput};

//textArea
const editRowsInput =
`
<div style="width: 50% !important;">
<label for="edit-rows-input" style="width: 100% !important;">Rows : </label>
<input type="number" id="edit-rows-input" style="width: 100% !important;">
</div>

`;

export {editRowsInput};

const editColsInput =
`
<div style="width: 50% !important;">
<label for="edit-cols-input" style="width: 100% !important;">Cols : </label>
<input type="number" id="edit-cols-input" style="width: 100% !important;">
</div>

`;

export {editColsInput};
//Date
const editdefaultvalueDateInput =
`
<div style="width: 100% !important;">
<label for="edit-value-date-input" style="width: 35% !important;">Value : </label>
<input type="date" id="edit-value-date-input" style="width: 65% !important;">
</div>

`;

export {editdefaultvalueDateInput};

const editMinateInput =
`
<div style="width: 100% !important;">
<label for="edit-min-date-input" style="width: 35% !important;">Min : </label>
<input type="date" id="edit-min-date-input" style="width: 65% !important;">
</div>

`;

export {editMinateInput};

const editMaxDateInput =
`
<div style="width: 100% !important;">
<label for="edit-max-date-input" style="width: 35% !important;">Max : </label>
<input type="date" id="edit-max-date-input" style="width: 65% !important;">
</div>

`;

export {editMaxDateInput};

//Time

const editdefaultvalueTimeInput =
`
<div style="width: 100% !important;">
<label for="edit-value-time-input" style="width: 35% !important;">Value : </label>
<input type="time" id="edit-value-time-input" style="width: 60% !important;">
</div>

`;

export {editdefaultvalueTimeInput};

const editMinTimeInput =
`
<div style="width: 100% !important;">
<label for="edit-min-time-input" style="width: 35% !important;">Min : </label>
<input type="time" id="edit-min-time-input" style="width: 60% !important;">
</div>

`;

export {editMinTimeInput};

const editMaxTimeInput =
`
<div style="width: 100% !important;">
<label for="edit-max-time-input" style="width: 35% !important;">Max : </label>
<input type="time" id="edit-max-time-input" style="width: 60% !important;">
</div>

`;

export {editMaxTimeInput};

const editStepTimeInput =
`
<div style="width: 100% !important;">
<label for="edit-step-time-input" style="width: 35% !important;">Step : </label>
<input type="number" id="edit-step-time-input" style="width: 60% !important;">
</div>

`;

export {editStepTimeInput};

//File
const editAcceptInput =
`
<div style="width: 100% !important;">
<label for="edit-accept-input" style="width: 100% !important;">Accept : </label>
<textarea id="edit-accept-input" rows="3" style="width: 100% !important;">.jpg, .png, .gif</textarea>
</div>

`; export {editAcceptInput};

//color
const editColorValue =
`
<div style="width: 100% !important;">
<label for="edit-color-input" style="width: 100% !important;">Default Color : </label>
<input type="color" id="edit-color-input" style="width: 100% !important;">
</div>

`; export {editColorValue};

const editMultipleCheck =
`
<div id="editMultipleFile" inputid="inputid1" class="checkbox-FormEditElement" data-id="checkboxInput" style="width: 100%;">
<label id="editMultipleFilelabel" for="Multiple" labelid="label1" style="width: 90%;">
Multiple</label>
<input fieldid="field1" type="checkbox" id="editMultipleFileinput" name="Multiple" style="width: 5%;">
</div>
`; export {editMultipleCheck};

//Select & Radio
//select
const Selectoption = 
`
<div style="width: 100% !important;">
<label for="edit-select-option-input" style="width: 100% !important;">Option : </label>
<textarea id="edit-select-option-input" rows="8" style="width: 100% !important;">

</textarea>
</div>

`; export {Selectoption};

const selectSize =
`
<div style="width: 100% !important;">
<label for="edit-select-size-input" style="width: 35% !important;">Select Size : </label>
<input type="number" id="edit-select-size-input" style="width: 60% !important;">
</div>

`; export {selectSize};

// TextArea
const textAreaValue = 
`
<div style="width: 100% !important;">
<label for="edit-textArea-value-input" style="width: 100% !important;">Value : </label>
<textarea id="edit-textArea-value-input" rows="8" style="width: 100% !important;">

</textarea>
</div>

`; export {textAreaValue};

//Submit Type

const submitType = `<div style="width: 100%;">
<label style="width: 35% !important;">Type : </label>
<select id="submit-type" style="width: 60% !important;">
<option value="">
</option>
<option value=""></option>
<option value="button">Button</option>
<option value="submit">Submit</option>
<option value="reset">Reset</option>

</select>
</div>
`;

export {submitType};

//Range
const edit_Range_Apperance =`<div style="width: 100%;">
<label style="width: 35% !important;">Apperance : </label>
<select id="range-apperance" style="width: 60% !important;">
<option value="">
</option>
<option value="slider-horizontal">
slider-horizontal</option>
<option value="slider-vertical">
slider-vertical</option>
<option value="slider-thumb-vertical">
slider-thumb-vertical</option>
<option value="slider-thumb-horizontal">
slider-thumb-horizontal</option>
<option value="none">
none</option>
</select>
</div>
`;

export {edit_Range_Apperance};

const rangeStyle = `
<hr inputid="inputid2" fieldid="field2" style="border-top: 1px solid rgba(172, 165, 171, 0.45); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
<paragraph inputid="inputid3" fieldid="field3" style="font-size: 13px; margin-left: -2%; color: rgb(209, 209, 209); opacity: 1;">
Range Customize</paragraph>
<hr inputid="inputid4" fieldid="field4" style="border-top: 1px solid rgba(148, 148, 148, 0.58); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
<div id="thumbColor" inputid="inputid1" style="width: 100%; opacity: 1;">
<label id="thumbColorlabel" for="thumbColor" labelid="label1" style="width: 45% !important;">
Bullet Color :</label>
<input fieldid="field1" type="color" value="#999498" id="thumbColorinput" name="thumbColor" style="width: 50% !important;">
</div>
<div id="data_Radius_Thumb" inputid="inputid5" style="width: 100%;">
<label id="data_Radius_Thumblabel" for="data_Radius_Thumb" labelid="label5" style="width: 45% !important;">
Bullet Radius : </label>
<input fieldid="field5" type="number" min="0" id="data_Radius_Thumbinput" name="data_Radius_Thumb" style="width: 50% !important;">
</div>
<hr inputid="inputid6" fieldid="field6" style="border-top: 1px solid rgba(163, 163, 163, 0.59); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">
<paragraph inputid="inputid7" fieldid="field7" style="font-size: 12px; margin-left: -2%; color: rgb(207, 207, 207);">
OnActive</paragraph>
<hr inputid="inputid8" fieldid="field8" style="border-top: 1px solid rgba(209, 209, 209, 0.53); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">
<div id="data_thumb_OTstyle" inputid="inputid9" style="width: 100%;">
<label id="data_thumb_OTstylelabel" for="NewFIeld9" labelid="label9" style="width: 45% !important;">
Outline-style : </label>
<select fieldid="field9" id="data_thumb_OTstyleinput" name="NewFIeld9" style="width: 50% !important;">
<option value="">
</option>
<option value="solid">
solid</option>
<option value="dotted">
dotted</option>
<option value="dashed">
dashed</option>
<option value="double">
double</option>
<option value="groove">
groove</option>
<option value="ridge">
ridge</option>
<option value="inset">
inset</option>
<option value="outset">
outset</option>
</select>
</div>
<div id="data_thumb_OTcolor" inputid="inputid10" style="width: 100%;">
<label id="data_thumb_OTcolorlabel" for="data_thumb_OTcolor" labelid="label10" style="width: 45% !important;">
Outline-color : </label>
<input fieldid="field10" type="color" value="#c512ad" id="data_thumb_OTcolorinput" name="data_thumb_OTcolor" style="width: 50% !important;">
</div>
<div id="data_outline_OFfset" inputid="inputid11" style="width: 100%;">
<label id="data_outline_OFfsetlabel" for="data_outline_OFfset" labelid="label11" style="width: 45% !important;">
Outline-offset : </label>
<input fieldid="field11" type="number" id="data_outline_OFfsetinput" name="data_outline_OFfset" style="width: 50% !important;" max="100" value="" step="0.05" min="0">
</div>

<div id="Outline_Size" inputid="inputid14" style="width: 100%;">
<label id="Outline_Sizelabel" for="Outline_Size" labelid="label14" style="width: 45% !important;">
Outline-size : </label>
<input fieldid="field14" type="number" id="Outline_Sizeinput" name="Outline_Size" max="" value="50" step="0.025" min="0" style="width: 50% !important;">
</div>

<div id="data_Range_textArea" inputid="inputid13" style="width: 100%; display: none;">
<label id="data_Range_textArealabel" for="data_Range_textArea" labelid="label13" style="width: 100% !important;">
Range CSS Value :</label>
<textarea fieldid="field13" id="data_Range_textAreainput" name="data_Range_textArea" rows="6" placeholder="" style="width: 100% !important;">
</textarea>
</div>

<hr inputid="inputid12" fieldid="field12" style="border-top: 1px solid rgba(199, 199, 199, 0.46); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">

`

export { rangeStyle };

//-----------------------------------------------------
//Checkbox Elements

const checked =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Checked</label>
<input type="checkbox" id="edit-checked-edit" style="width: 5%;">
</div>
`; export {checked};

const autofocus =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Auto focus</label>
<input type="checkbox" id="edit-autofocus-edit" style="width: 5%;">
</div>
`; export {autofocus};



const editRequiredCheck =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Required</label>
<input type="checkbox" id="edit-required-edit" style="width: 5%;">
</div>
`; export {editRequiredCheck};

const editreadonlyCheck =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Readonly</label>
<input type="checkbox" id="edit-readonly-edit" style="width: 5%;">
</div>
`; export {editreadonlyCheck};

const editdisabledCheck =
`
<div class="checkbox-FormEditElement" style="width: 100%;">
<label style="width: 90%;">
Disabled</label>
<input type="checkbox" id="edit-disabled-edit" style="width: 5%;">
</div>
`; export {editdisabledCheck};



//================================================
  //Image
  const editFormimageSRC = `<div>
<label style="width: 30%; !important">Image Url :</label>
<input type="text" id="image-src-input" style="width: 65%; !important">
</div>

<button id="media-file-upload-src-img" data-upload="image-src-input" class="js-media-file" style="font-size: 10px !important; width: 65%; margin-top: 5px;">Use Media File</button>

<div class="base-mode" style="width: 100% !important;">
<label id="editobject-fitlabel" for="NewFIeld1" labelid="label1" style="width: 25% !important;">
Object-fit</label>

<select id="editobject-fitinput" name="NewFIeld1" style="width: 70% !important;">
<option value="">
</option>
<option value="fill">
fill</option>
<option value="contain">
contain</option>
<option value="cover">
cover</option>
<option value="none">
none</option>
<option value="scale-down">
scale-down</option>
</select>

</div>

<div class="tablet-mode" style="width: 100% !important;">
<label id="editobject-fitlabel" for="NewFIeld1" labelid="label1" style="width: 25% !important;">
Object-fit</label>

<select id="editobject-fitinput-tablet" name="NewFIeld1" style="width: 70% !important;">
<option value="">
</option>
<option value="fill">
fill</option>
<option value="contain">
contain</option>
<option value="cover">
cover</option>
<option value="none">
none</option>
<option value="scale-down">
scale-down</option>
</select>

</div>

<div class="mobile-mode" style="width: 100% !important;">
<label id="editobject-fitlabel" for="NewFIeld1" labelid="label1" style="width: 25% !important;">
Object-fit</label>

<select id="editobject-fitinput-mobile" name="NewFIeld1" style="width: 70% !important;">
<option value="">
</option>
<option value="fill">
fill</option>
<option value="contain">
contain</option>
<option value="cover">
cover</option>
<option value="none">
none</option>
<option value="scale-down">
scale-down</option>
</select>

</div>

<hr inputid="inputid3" fieldid="field3" style="border-top: 1px solid rgba(240, 240, 240, 0.18); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">

<div class="base-mode" style="width: 50% !important;">
<label id="editimagepositionxlabel" for="editimagepositionx" labelid="label4" style="width: 100% !important;">
position X(%)</label>
<input fieldid="field4" type="number" id="editimagepositionxinput" name="editimagepositionx" style="width: 90% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="tablet-mode" style="width: 50% !important;">
<label id="editimagepositionxlabel" for="editimagepositionx" labelid="label4" style="width: 100% !important;">
position X(%)</label>
<input fieldid="field4" type="number" id="editimagepositionxinput-tablet" name="editimagepositionx" style="width: 90% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="mobile-mode" style="width: 50% !important;">
<label id="editimagepositionxlabel" for="editimagepositionx" labelid="label4" style="width: 100% !important;">
position X(%)</label>
<input fieldid="field4" type="number" id="editimagepositionxinput-mobile" name="editimagepositionx" style="width: 90% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="base-mode" style="width: 50% !important;">
<label id="editimagepositionylabel" for="editimagepositiony" labelid="label5" style="width: 100% !important;">
position Y(%)</label>
<input type="number" id="editimagepositionyinput" name="editimagepositiony" style="width: 100% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="tablet-mode" style="width: 50% !important;">
<label id="editimagepositionylabel" for="editimagepositiony" labelid="label5" style="width: 100% !important;">
position Y(%)</label>
<input type="number" id="editimagepositionyinput-tablet" name="editimagepositiony" style="width: 100% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="mobile-mode" style="width: 50% !important;">
<label id="editimagepositionylabel" for="editimagepositiony" labelid="label5" style="width: 100% !important;">
position Y(%)</label>
<input type="number" id="editimagepositionyinput-mobile" name="editimagepositiony" style="width: 100% !important;" max="100" value="" step="1" min="-100">
</div>

<div class="base-mode">
<hr inputid="inputid6" fieldid="field6" style="border-top: 1px solid rgba(255, 255, 255, 0.13); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">
<div id="editimagerendering" inputid="inputid7" style="width: 50% !important;">
<label id="editimagerenderinglabel" for="NewFIeld7" labelid="label7" style="width: 100% !important;">
image-rendering</label>
<select fieldid="field7" id="editimagerenderinginput" name="NewFIeld7" style="width: 95% !important;">
<option value="">
</option>
<option value="auto">
auto</option>
<option value="crisp-edges">
crisp-edges</option>
<option value="pixelated">
pixelated</option>
</select>
</div>
<div id="editimageorientation" inputid="inputid8" style="width: 50% !important;">
<label id="editimageorientationlabel" for="NewFIeld8" labelid="label8" style="width: 100% !important;">
image-orientation</label>
<select fieldid="field8" id="editimageorientationinput" name="NewFIeld8" style="width: 100% !important;">
<option value="">
</option>
<option value="from-image">from-image</option>
<option value="none">
none</option>
<option value="flip">
flip</option>
<option value="flip-horizonta">
flip-horizonta</option>
<option value="flip-vertical">
flip-vertical</option>
</select>
</div>

</div>


`;
export { editFormimageSRC };
// Header Text
const editFormHeaderText = `<div id="HeaderText" style="width: 100%; padding-left: 5px;">


<div id="toolbarText"></div>
<textarea id="HeaderTextinput" rows="5" style="width: 100%; display: block;">
</textarea>
`
;
export { editFormHeaderText };

// Content Text
const editFormContentText = `<div id="ContentsText" style="width: 100%; padding-left: 5px;">


<div id="toolbarTextContent"></div>
<textarea id="ContentsTextinput" rows="5" style="width: 100%; display: block;">
</textarea>
`
;
export { editFormContentText };

const editFormfontProperties = `<div id="fontsize" style="width: 36% !important;">
  <label id="fontsizelabel" for="NewFIeld3" style="width: 100% !important;">Font-size</label>
  <input type="number" min="0" class="base-mode" id="fontsizeinput" name="NewFIeld3" style="width: 85% !important;">
  <input type="number" min="0" class="hover-mode" id="fontsizeinput-hover" name="NewFIeld3" style="width: 85% !important;">
  <input type="number" min="0" class="active-mode" id="fontsizeinput-active" name="NewFIeld3" style="width: 85% !important;">
  <input type="number" min="0" class="tablet-mode" id="fontsizeinput-tablet" name="NewFIeld3" style="width: 85% !important;">
  <input type="number" min="0" class="mobile-mode" id="fontsizeinput-mobile" name="NewFIeld3" style="width: 85% !important;">
</div>

<div id="fontsizeparam" style="width: 33% !important;">
  <label id="fontsizeparamlabel" for="NewFIeld6" style="width: 100% !important;">Parameter</label>
  <select id="fontsizeparaminput" class="base-mode" style="width: 90% !important;">
    <option value=""></option>
    <option value="rem">rem</option>
    <option value="em">em</option>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="vw">vw</option>
    <option value="vh">vh</option>
    <option value="vmin">vmin</option>
    <option value="vmax">vmax</option>
  </select>

  <select id="fontsizeparaminput-hover" class="hover-mode" style="width: 90% !important;">
    <option value=""></option>
    <option value="rem">rem</option>
    <option value="em">em</option>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="vw">vw</option>
    <option value="vh">vh</option>
    <option value="vmin">vmin</option>
    <option value="vmax">vmax</option>
  </select>

  <select id="fontsizeparaminput-active" class="active-mode" style="width: 90% !important;">
    <option value=""></option>
    <option value="rem">rem</option>
    <option value="em">em</option>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="vw">vw</option>
    <option value="vh">vh</option>
    <option value="vmin">vmin</option>
    <option value="vmax">vmax</option>
  </select>

  <select id="fontsizeparaminput-tablet" class="tablet-mode" style="width: 90% !important;">
    <option value=""></option>
    <option value="rem">rem</option>
    <option value="em">em</option>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="vw">vw</option>
    <option value="vh">vh</option>
    <option value="vmin">vmin</option>
    <option value="vmax">vmax</option>
  </select>

  <select id="fontsizeparaminput-mobile" class="mobile-mode" style="width: 90% !important;">
    <option value=""></option>
    <option value="rem">rem</option>
    <option value="em">em</option>
    <option value="px">px</option>
    <option value="%">%</option>
    <option value="vw">vw</option>
    <option value="vh">vh</option>
    <option value="vmin">vmin</option>
    <option value="vmax">vmax</option>
  </select>

</div>

<div id="font-weight" style="width: 30% !important;">
  <label id="font-weightlabel" for="NewFIeld8" style="width: 100% !important;">Weight</label>
  <select id="font-weightinput" name="NewFIeld8" style="width: 100% !important;" class="base-mode">
    <option value=""></option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700</option>
    <option value="800">800</option>
    <option value="900">900</option>
    <option value="Bold">Bold</option>
  </select>

<select id="font-weightinput-hover" name="NewFIeld8" style="width: 100% !important;" class="hover-mode">
    <option value=""></option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700</option>
    <option value="800">800</option>
    <option value="900">900</option>
    <option value="Bold">Bold</option>
  </select>

<select id="font-weightinput-active" name="NewFIeld8" style="width: 100% !important;" class="active-mode">
    <option value=""></option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700</option>
    <option value="800">800</option>
    <option value="900">900</option>
    <option value="Bold">Bold</option>
  </select>

<select id="font-weightinput-tablet" name="NewFIeld8" style="width: 100% !important;" class="tablet-mode">
    <option value=""></option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700</option>
    <option value="800">800</option>
    <option value="900">900</option>
    <option value="Bold">Bold</option>
  </select>

<select id="font-weightinput-mobile" name="NewFIeld8" style="width: 100% !important;" class="mobile-mode">
    <option value=""></option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
    <option value="700">700</option>
    <option value="800">800</option>
    <option value="900">900</option>
    <option value="Bold">Bold</option>
  </select>


</div>

<div id="font-style" style="width: 50% !important;">
  <label class="base-mode" style="width: 100% !important;">Font-Style</label>
  <label class="hover-mode" style="width: 100% !important;">Font-Style</label>
  <select id="font-styleinput" name="NewFIeld9" style="width: 100% !important;" class="base-mode">
    <option value=""></option>
    <option value="normal">normal</option>
    <option value="italic">italic</option>
    <option value="oblique">oblique</option>
  </select>

<select id="font-styleinput-hover" name="NewFIeld9" style="width: 100% !important;" class="hover-mode">
    <option value=""></option>
    <option value="normal">normal</option>
    <option value="italic">italic</option>
    <option value="oblique">oblique</option>
  </select>
</div>

<div id="word-spacing" style="width: 50% !important;">
  <label class="base-mode" for="word-spacing" style="width: 100% !important;">Word-spacing (em)</label>
  <label class="hover-mode" for="word-spacing" style="width: 100% !important;">Word-spacing (em)</label>

  <input type="number" id="word-spacinginput" name="word-spacing" style="width: 100% !important;" max="10" value="" step="0.0327" min="0" class="base-mode">

  <input type="number" id="word-spacinginput-hover" name="word-spacing" style="width: 100% !important;" max="10" value="" step="0.0327" min="0" class="hover-mode">
  
  </div>

<div id="text-decoration" style="width: 50% !important;">
  <label class="base-mode" id="text-decorationlabel" for="NewFIeld10" style="width: 100% !important;">Text-decoration</label>
  <label class="hover-mode" id="text-decorationlabel" for="NewFIeld10" style="width: 100% !important;">Text-decoration</label>
  <select id="text-decorationinput" name="NewFIeld10" style="width: 93% !important;" class="base-mode">
    <option value=""></option>
    <option value="underline">underline</option>
    <option value="overline">overline</option>
    <option value="line-through">line-through</option>
    <option value="underline overline">underline overline</option>
    <option value="underline line-through">underline line-through</option>
  </select>

<select id="text-decorationinput-hover" name="NewFIeld10" style="width: 93% !important;" class="hover-mode">
    <option value=""></option>
    <option value="underline">underline</option>
    <option value="overline">overline</option>
    <option value="line-through">line-through</option>
    <option value="underline overline">underline overline</option>
    <option value="underline line-through">underline line-through</option>
  </select>
</div>

<div id="text-transform" style="width: 50% !important;">
  <label class="base-mode" style="width: 100% !important;">Text-transform</label>
  <label class="hover-mode" style="width: 100% !important;">Text-transform</label>
  <select id="text-transforminput" name="NewFIeld11" style="width: 100% !important;" class="base-mode">
    <option value=""></option>
    <option value="none">none</option>
    <option value="uppercase">uppercase</option>
    <option value="lowercase">lowercase</option>
    <option value="capitalize">capitalize</option>
    <option value="full-width">full-width</option>
  </select>

<select id="text-transforminput-hover" name="NewFIeld11" style="width: 100% !important;" class="hover-mode">
    <option value=""></option>
    <option value="none">none</option>
    <option value="uppercase">uppercase</option>
    <option value="lowercase">lowercase</option>
    <option value="capitalize">capitalize</option>
    <option value="full-width">full-width</option>
  </select>
</div>

<div id="letter-spacing" style="width: 50% !important;">
  <label class="base-mode" for="letter-spacing" style="width: 100% !important;">Letter-spacing (em)</label>
  <input type="number" min="0" class="base-mode" id="letter-spacinginput" name="letter-spacing" style="width: 90% !important;">
</div>

<div id="line-height" style="width: 50% !important;">
  <label class="base-mode" style="width: 100% !important;">Line-height (em)</label>
  <input type="number" min="0" step="0.117" class="base-mode" id="line-heightinput" name="line-height" style="width: 100% !important;">
</div>
  
  <div id="font-smoothing" style="width: 100% !important;">
  <label class="base-mode" for="NewFIeld22" style="width: 100% !important;">Font-smoothing</label>
  <select id="font-smoothinginput" name="NewFIeld22" style="width: 100% !important;" class="base-mode">
    <option value=""></option>
    <option value="antialiased">antialiased</option>
    <option value="subpixel-antialiased">subpixel-antialiased</option>
    <option value="subpixel-antialiased">cleartype</option>
    <option value="subpixel-antialiased">grayscale</option>
  </select>

  </div>
  <div id="Text-shadow" class="checkbox-FormEditElement" style="width: 100%;">
  <label class="base-mode" style="width: 90% !important;">Text-shadow</label>
  <input type="checkbox" id="Text-shadowinput" name="Text-shadow" style="width: 5% !important;" class="base-mode">
</div>

<div id="FontafterChecked">
  <!-- Isi elemen -->
  <div id="horizontal offset" style="width: 100%;">


  <label id="horizontal-offset-label-hover" for="horizontal offset" style="width: 100% !important;">Horizontal offset</label>

  <input type="range" min="-10" max="10" value="0" step="0.01" id="horizontal-offset-input" name="horizontal offset" style="width: 100% !important;" class="base-mode">
  
  </div>
  
  <div id="vertical-offset" style="width: 100%;">
  <label id="vertical-offsetlabel" for="vertical offset" style="width: 100% !important;">Vertical offset</label>
  <input type="range" min="-10" max="10" value="0" step="0.01" id="vertical-offsetinput" name="vertical offset" style="width: 100% !important;" class="base-mode">
</div>
  
  <div id="blurradius" style="width: 100%;">
  <label id="blurradiuslabel" for="blur radius" style="width: 100% !important;">Blur radius</label>

  <input type="range" min="-10" max="10" value="0" step="0.005" id="blurradiusinput" name="blur radius" style="width: 100% !important;" class="base-mode">
 </div>
  
  <div id="textShadowcolor" style="width: 100%;">
  <label id="textShadowcolorlabel" for="color" style="width: 70% !important;">Color</label>
  <input type="color" value="#616161" id="textShadowcolorinput" name="color" style="width: 25% !important;" class="base-mode">
</div>
  
  <div id="textshadowOpacity" style="width: 100%;">
  <label id="textshadowOpacitylabel" for="Opacity" style="width: 100%;">Opacity</label>
  <input type="range" min="0" max="1" value="0.5" step="0.01" id="textshadowOpacityinput" name="Opacity" style="width: 100%;" class="base-mode">
 </div>
  
</div>

<hr inputid="inputid26" fieldid="field26" style="border-top: 1px solid rgba(255, 255, 255, 0.34); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
</div>

`;
export { editFormfontProperties };

/// Input dan Label

//CSS Positioning

const editCssPositioning =
`

<div id="CSSPosition" inputid="inputid1" class="checkbox-FormGeneratorMaker" data-id="checkboxInput" style="width: 50% !important;">

<input fieldid="field1" type="checkbox" id="CSSPositioninput" name="CSS Position" style="width: 10% !important;">
<label id="CSSPositionlabel" for="CSS Position" labelid="label1" style="padding-left: 3%; width: 80% !important;">
CSS Positioning</label>
</div>

<div id="css-positioning-after-check">

<div id="CSSPositioningUnit" inputid="inputid2" style="width: 100% !important;">
<label id="CSSPositioningUnitlabel" for="NewFIeld2" labelid="label2" style="width: 50% !important;">
Parameter</label>

<select id="CSSPositioningUnitinput" style="width: 45% !important;" class="base-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="rem">
rem</option>
<option value="em">
em</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
<option value="cm">
cm</option>
<option value="mm">
mm</option>
<option value="in">
in</option>
<option value="pc">
pc</option>
<option value="pt">
pt</option>
</select>

<select id="CSSPositioningUnitinput-hover" style="width: 45% !important;" class="hover-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="rem">
rem</option>
<option value="em">
em</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
<option value="cm">
cm</option>
<option value="mm">
mm</option>
<option value="in">
in</option>
<option value="pc">
pc</option>
<option value="pt">
pt</option>
</select>

<select id="CSSPositioningUnitinput-active" style="width: 45% !important;" class="active-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="rem">
rem</option>
<option value="em">
em</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
<option value="cm">
cm</option>
<option value="mm">
mm</option>
<option value="in">
in</option>
<option value="pc">
pc</option>
<option value="pt">
pt</option>
</select>

<select id="CSSPositioningUnitinput-tablet" style="width: 45% !important;" class="tablet-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="rem">
rem</option>
<option value="em">
em</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
<option value="cm">
cm</option>
<option value="mm">
mm</option>
<option value="in">
in</option>
<option value="pc">
pc</option>
<option value="pt">
pt</option>
</select>

<select id="CSSPositioningUnitinput-mobile" style="width: 45% !important;" class="mobile-mode">
<option value="">
</option>
<option value="px">
px</option>
<option value="%">
%</option>
<option value="rem">
rem</option>
<option value="em">
em</option>
<option value="vw">
vw</option>
<option value="vh">
vh</option>
<option value="vmin">
vmin</option>
<option value="vmax">
vmax</option>
<option value="cm">
cm</option>
<option value="mm">
mm</option>
<option value="in">
in</option>
<option value="pc">
pc</option>
<option value="pt">
pt</option>
</select>

</div>

<div id="PositioningTop" inputid="inputid3" style="width: 25% !important;">
<label id="PositioningToplabel" for="PositioningTop" labelid="label3" style="width: 100% !important;">
Top</label>

<input fieldid="field3" type="number" id="PositioningTopinput" name="PositioningTop" max="" value="" step="0.25" min="" style="width: 100% !important;" class="base-mode">


<input fieldid="field3" type="number" id="PositioningTopinput-hover" name="PositioningTop" max="" value="" step="0.25" min="" style="width: 100% !important;" class="hover-mode">


<input fieldid="field3" type="number" id="PositioningTopinput-active" name="PositioningTop" max="" value="" step="0.25" min="" style="width: 100% !important;" class="active-mode">


<input fieldid="field3" type="number" id="PositioningTopinput-tablet" name="PositioningTop" max="" value="" step="0.25" min="" style="width: 100% !important;" class="tablet-mode">


<input fieldid="field3" type="number" id="PositioningTopinput-mobile" name="PositioningTop" max="" value="" step="0.25" min="" style="width: 100% !important;" class="mobile-mode">

</div>
<div id="PositioningRight" inputid="inputid4" style="width: 25% !important;">
<label id="PositioningRightlabel" for="PositioningRight" labelid="label4" style="width: 100% !important;">
Right</label>

<input fieldid="field4" type="number" id="PositioningRightinput" name="PositioningRight" style="width: 100% !important;" max="" value="" step="0.25" min="" class="base-mode">


<input fieldid="field4" type="number" id="PositioningRightinput-hover" name="PositioningRight" style="width: 100% !important;" max="" value="" step="0.25" min="" class="hover-mode">


<input fieldid="field4" type="number" id="PositioningRightinput-active" name="PositioningRight" style="width: 100% !important;" max="" value="" step="0.25" min="" class="active-mode">


<input fieldid="field4" type="number" id="PositioningRightinput-tablet" name="PositioningRight" style="width: 100% !important;" max="" value="" step="0.25" min="" class="tablet-mode">


<input fieldid="field4" type="number" id="PositioningRightinput-mobile" name="PositioningRight" style="width: 100% !important;" max="" value="" step="0.25" min="" class="mobile-mode">

</div>
<div id="PositioningBottom" inputid="inputid5" style="width: 25% !important;">
<label id="PositioningBottomlabel" for="PositioningBottom" labelid="label5" style="width: 100% !important;">
Bottom</label>

<input fieldid="field5" type="number" id="PositioningBottominput" name="PositioningBottom" style="width: 100% !important;" max="" value="" step="0.25" min="" class="base-mode">


<input fieldid="field5" type="number" id="PositioningBottominput-hover" name="PositioningBottom" style="width: 100% !important;" max="" value="" step="0.25" min="" class="hover-mode">


<input fieldid="field5" type="number" id="PositioningBottominput-active" name="PositioningBottom" style="width: 100% !important;" max="" value="" step="0.25" min="" class="active-mode">


<input fieldid="field5" type="number" id="PositioningBottominput-tablet" name="PositioningBottom" style="width: 100% !important;" max="" value="" step="0.25" min="" class="tablet-mode">


<input fieldid="field5" type="number" id="PositioningBottominput-mobile" name="PositioningBottom" style="width: 100% !important;" max="" value="" step="0.25" min="" class="mobile-mode">

</div>
<div id="PositioningLeft" inputid="inputid6" style="width: 25% !important;">
<label id="PositioningLeftlabel" for="PositioningLeft" labelid="label6" style="width: 100% !important;">
Left</label>

<input fieldid="field6" type="number" id="PositioningLeftinput" name="PositioningLeft" max="" value="" step="0.25" min="" style="width: 100% !important;" class="base-mode">


<input fieldid="field6" type="number" id="PositioningLeftinput-hover" name="PositioningLeft" max="" value="" step="0.25" min="" style="width: 100% !important;" class="hover-mode">


<input fieldid="field6" type="number" id="PositioningLeftinput-active" name="PositioningLeft" max="" value="" step="0.25" min="" style="width: 100% !important;" class="active-mode">


<input fieldid="field6" type="number" id="PositioningLeftinput-tablet" name="PositioningLeft" max="" value="" step="0.25" min="" style="width: 100% !important;" class="tablet-mode">


<input fieldid="field6" type="number" id="PositioningLeftinput-mobile" name="PositioningLeft" max="" value="" step="0.25" min="" style="width: 100% !important;" class="mobile-mode">

</div>

</div>
<hr inputid="inputid7" fieldid="field7" style="border-top: 1px solid rgba(184, 184, 184, 0.67); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px;">

`;
export {editCssPositioning};