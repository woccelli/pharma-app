import {StyleSheet} from '@react-pdf/renderer';

const colors = {
    light1: '#648AC0',
    light2: '#056AC1',
    light3: '#BCD7F3',
    dark1: '#FAF8FC',
    dark2: '#F1C4AE',
    dark3: '#2E5573',
}

const A4 ={
    width: 210,
    height: 297
}

// Create styles
var globalStyle = {
    page: {
        backgroundColor: "white",
        fontFamily: "Lato",
        fontSize: '13pt',
        textAlign: 'justify',
        color: colors.dark3
    },
    hrline: {
        height: "1mm",
        width: "100%",
        backgroundColor: colors.dark3,
        marginBottom: "3mm"
    },
    subtitle: {
        fontFamily: "RobotoSlab", 
        fontSize:"16pt"
    },
    boldText: {
        fontFamily: "Lato",
        fontWeight: "bold"
    },
    italicText: {
        fontFamily: "Lato",
        fontStyle: "italic"
    }
}

var titlePageStyle = {
    titlePageHeader: {
        width: A4.width+"mm", 
        height: "60mm", 
        backgroundColor: "white",
        color: colors.dark3,
        position: "absolute",
        top: 0,
        left: 0
    },
    titlePageHeaderText: {
        position: "absolute", 
        bottom: "10mm", 
        left: "10mm",
        fontSize: '16pt'
    },
    titlePageHeaderImage: {
        width: "40mm",
        height: "40mm",
        position: "absolute",
        top: "10mm",
        right: "10mm"
    },
    titlePageHeaderContact: {
        position: "absolute",
        top: "5mm",
        left: "-5mm",
        textAlign: "right",
        fontSize:"16pt"
    },
    titlePageBody: {
        paddingTop: "55mm",
        paddingLeft: "0mm",
        paddingRight: "0mm",
        paddingBottom: "20mm",
        // backgroundColor:"green"
    },
    definition: {
        width:'200mm', 
        height:"50mm", 
        backgroundColor: colors.dark1, 
        borderLeft: "6mm solid "+colors.dark3,
        padding: "5mm",
        marginBottom: "5mm",
        marginLeft: "5mm",
        marginRight: "5mm",
    },
    adviceSection: {
        width:"100%",
        // backgroundColor:"gray"
    },
    adviceFlexContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "flex-start", 
        flexWrap: "wrap",
        height:"145mm",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor:"brown"
    },
    advice: {
        boxSizing: "borderBox", 
        width: "50%",
        // backgroundColor: "yellow",
        minHeight: "30mm",
        display: "flex",
        flexDirection: "row",
        margin: "1mm",
        padding: "5mm"
    },
    advicePictoZone: {
        width: "15mm",
        height: "15mm",
        float: "left",
    },
    adviceImage: {
        width: "15mm",
        height: "15mm"
    },
    adviceText: {
        width: "80mm",
        paddingLeft: "5mm",
        paddingRight: "5mm",
        float: "left"
    },
}

var normalPageStyle = {
    normalBody: {
        paddingLeft: "5mm",
        paddingRight: "5mm",
        paddingBottom: "20mm",
        paddingTop: "20mm",
        // 
    },
    centralSection: {
        backgroundColor: colors.dark1,
        padding: "5mm"
    }
}

var normalPageHeader = {
    header: {
        width: A4.width+"mm", 
        height: "15mm", 
        backgroundColor: colors.dark3,
        color: "white",
        marginBottom: "5mm",
        position: "absolute",
        top: 0,
        left: 0
    },
    headerText: {
        position: "absolute",
        left: "10mm",
        top:"4mm"
    }
}

var normalPageFooter = {
    footer: {
        width: A4.width+"mm", 
        height: "15mm",
        position: "absolute",
        bottom:0,
        left: 0,
        // backgroundColor: "red",
    },
    footerNote: {
        position: "absolute",
        left: "5mm",
        bottom:"5mm",
        fontFamily: "Lato",
        fontWeight: "light"
    },
    numPage: {
        position: "absolute",
        right: "5mm",
        bottom:"5mm",
        color:"white",
        paddingLeft:"1mm",
        paddingRight:"1mm",
        fontFamily: "RobotoSlab", 
        fontSize:"16pt",
        backgroundColor: colors.dark3
    }
}

var styles = StyleSheet.create({...globalStyle, 
    ...titlePageStyle,
    ...normalPageStyle, 
    ...normalPageHeader, 
    ...normalPageFooter})

export {styles, colors}