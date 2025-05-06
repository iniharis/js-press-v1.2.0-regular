export const JsAnimationPluginList = 
[
{name: "Gsap Animation", value:"gsap", 
link:`
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>

`},
{name: "Smooth Scroll Js", value:"SmoothScroll", link:""}
];

export const CSSFrameworkPluginList =  
[
{name: "Bootstrap 4.5.0", value:"Bootstrap450", 
link:`
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
`,
rawLink: "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"},
{name: "Video Js", value:"videojs830", link:`<link href="https://vjs.zencdn.net/8.3.0/video-js.css" rel="stylesheet">
`,
rawLink: "https://vjs.zencdn.net/8.3.0/video-js.css"}
]; 

export const Lazydev_FontOption = [
    "Zilla Slab",
  "Zilla Slab Highlight",
  "Yanone Kaffeesatz",
  "Work Sans",
  "Vollkorn",
  "Viaoda Libre",
  "Unna",
  "Ubuntu Condensed",
  "Ubuntu",
  "Trispace",
  "Titillium Web",
  "Tenor Sans",
  "Teko",
  "Syne",
  "Spectral",
  "Space Grotesk",
  "Source Sans Pro",
  "Source Code Pro",
  "Signika",
  "Scheherazade",
  "Saira Extra Condensed",
  "Rubik",
  "Roboto Condensed",
  "Roboto",
  "Recursive",
  "Raleway",
  "Rajdhani",
  "Quicksand",
  "Quattrocento Sans",
  "Prompt",
  "Poppins",
  "Playfair Display",
  "Padauk",
  "Oswald",
  "Open Sans",
  "Nunito",
  "Noto Sans JP",
  "Mukta",
  "Montserrat",
  "Markazi Text",
  "Manrope",
  "Literata",
  "Lexend",
  "Lato",
  "Karla",
  "Kanit",
  "Jost",
  "Inter",
  "Inconsolata",
  "Hind",
  "Heebo",
  "Halant",
  "Grenze",
  "Great Vibes",
  "Fraunces",
  "Fira Sans",
  "Exo 2",
  "Epilogue",
  "Droid Sans",
  "Dosis",
  "Della Respira",
  "Cormorant",
  "Comfortaa",
  "Chivo",
  "Cabin",
  "BioRhyme",
  "Biryani",
  "Big Shoulders Display",
  "Be Vietnam",
  "Archivo Black",
  "Archivo",
  "Amiri",
  "ABeeZee"
  ];

const dataAllArray = {
    JSarray: JsAnimationPluginList,
    CSSarray: CSSFrameworkPluginList,
    FONTarray: Lazydev_FontOption,
}

export const SendDataArray = async (req,res) =>{
    res.json({ dataAllArray });
  }