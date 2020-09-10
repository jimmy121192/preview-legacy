const upcDefault ={

    upc:'',   
    time: '',
    userresult: [],
    productId:'',
    productname:'',
    page:0,
    Navpage: "LogIn",
    keyword:"",
    productArr:[],
    mode: "off",
    firstname:"",
    lastname:"",
    newProdImg: '',
    clear:false,
    reviews:[],

    //SAVE PRODUCT INFO IN ADD PRODUCT
    savedName:"",
    savedManu:"",
    savedPrice:"",
    savedDesc:"",

    //THEME VARS
    bgcol:'white',
    navcol:'#614B8E',
    tabcol:'#DEDDEC',
    ptext:'white',
    stext:'black',
    radiocol: 'rgba(222, 221, 236, 0.5)',
    thelogo: require('../assets/purplelogo.png'),
    bottomcol: '#614B8E',
    radioval: 0,
    homebutt: '#927eb0',
    ttext: '#614B8E'
}


export function CheckBarcode(state = upcDefault, action){
    let obj = Object.assign({}, state)

    switch(action.type) {
        case "UPDATE_BARCODE":
            obj.upc =action.barcode;
            return obj;

        case "CHANGE_PAGE":
            obj.page =action.page;
            return obj;


        case "CHANGE_NAVPAGE":
            obj.Navpage =action.Navpage;
            return obj;

        case "CHANGE_NAVPAGETOTAB":
            obj.Navpage =action.Navpage;
            obj.page =action.page;
            return obj;

        case "KEYWORD_SEARCH":
            obj.keyword =action.keyword;
            return obj;

        case "UPDATE_TIME":
            obj.time =action.occuredTime;
            return obj;

        case "UPDATE_PRODUCT":
            obj.productname =action.productname;
            obj.productId = action.productId
            return obj;

        case "EXPORT_PRODUCT":
            obj.productArr =action.json;
            return obj;

        case "TOGGLE_FLASH":
            obj.mode =action.mode;
            return obj;
        
        case "USER_FIRSTNAME":
            obj.firstname =action.firstname;
            return obj;
    
        case "USER_LASTNAME":
            obj.lastname =action.lastname;
            return obj;

        case "REVIEWS_ARR":
            obj.reviews =action.reviews;
            return obj;

        case "NEW_PRODUCTIMG":
            obj.newProdImg =action.newProdImg;
            return obj;

        case "CLEARHISTORY":
            obj.clear =action.mode;
            return obj;

        case "NEW_PRODUCT":
            obj.savedName = action.name;
            obj.savedManu = action.manu;
            obj.savedPrice = action.price;
            obj.savedDesc = action.desc;
            return obj;
            
        case "CHANGETHEME":
            obj.bgcol =action.bgcol;
            obj.navcol =action.navcol;
            obj.tabcol =action.tabcol;
            obj.ptext =action.ptext;
            obj.stext =action.stext;
            obj.radiocol = action.radiocol;
            obj.thelogo = action.thelogo;
            obj.bottomcol = action.bottomcol;
            obj.radioval = action.radioval;
            obj.homebutt = action.homebutt;
            obj.ttext = action.ttext;
            return obj;


        default:
            return state;
            
        
        
    }
}

