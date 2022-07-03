import React from 'react';
import { Page, Text, View, Document, Font, Svg, Path } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown'

import latoRegular from './fonts/Lato/Lato-Regular.ttf'
import latoBold from './fonts/Lato/Lato-Bold.ttf'
import latoItalic from './fonts/Lato/Lato-Italic.ttf'
import latoLight from './fonts/Lato/Lato-Light.ttf'
import robotoSlab from './fonts/Roboto_Slab/RobotoSlab-Medium.ttf'
import {styles, colors} from './style'

export default class Sheet extends React.Component {

  // Create Document Component
  render() {
    Font.register({
      family: "Lato", 
      fonts: [
        {
          src: latoRegular
        },
        {
          src: latoLight,
          fontWeight: "light"
        },
        {
          src: latoBold,
          fontWeight: 'bold'
        },
        {
          src: latoItalic,
          fontStyle: 'italic'
        }
      ]
    })

    Font.register({
        family: "RobotoSlab", 
        src: robotoSlab
    })

    const rcolors = ['#E2F2F1', '#FCF4F1', '#DEEBEA', '#E7F0F4', '#DEEBEA', '#E7F0F4']

    const currDate = new Date()

    function markdownText(text) {
      return (
        <ReactMarkdown
          components={{
            p: ({node, ...props}) => <Text {...props}/>,
            em: ({node, ...props}) => <Text style={styles.italicText} {...props}/>,
            strong: ({node, ...props}) => <Text style={styles.boldText} {...props}/>,
            li: ({node, ...props}) => <Text>• {props.children[0]}</Text>,
            ul: ({node, ...props}) => <Text {...props}/>,
            br: ({node, ...props}) => <Text>{"\n"}</Text>, 
            ol: ({node, ...props}) => <Text {...props}/>,
            code: ({node, ...props}) => {<Text {...props}/>},
            pre: ({node, ...props}) => <Text {...props}/>
          }}
          children={text}
        />
      )
    }

    return (
      <Document>
        <Page size="A4" style={[styles.page, styles.titlePageBody]}>

          <View style={styles.titlePageHeader} fixed>
            <View style={styles.titlePageHeaderText}>
              <Text style={{fontFamily: "RobotoSlab", fontSize:"25pt"}}>{this.props.name}</Text>
            </View>
            <View style={styles.titlePageHeaderContact}>
              <Text>{this.props.address.dest}</Text>
              <Text>{this.props.address.addr_1}</Text>
              <Text>{this.props.address.addr_2}</Text>
              <Text>{this.props.address.postcode} {this.props.address.city}</Text>
            </View>
          </View>
            
          <View>

            <View style={styles.definition}>
                <Text style={styles.subtitle}>Définition</Text>
                <View style={styles.hrline}></View>
                <Text>
                  {markdownText(this.props.definition)}
                </Text>
            </View>

            <View style={styles.adviceSection}>
              <View style={{marginRight: "5mm", marginLeft: "5mm"}}>
                <Text style={styles.subtitle}>Conseils</Text>
                <View style={styles.hrline}></View>
              </View>
              <View style={styles.adviceFlexContainer}>
                {
                  this.props.advices?.map((advice, index) => (
                    <View style={[styles.advice, {backgroundColor: rcolors[index % rcolors.length]}]} key={index}>
                      <View style={styles.advicePictoZone}>
                        <Svg viewBox={"0 0 30 30"} width={"30mm"} height={"30mm"} style={styles.adviceImage}>
                          <Path d={advice.icon} fill={colors.dark3}/>
                        </Svg> 
                      </View>
                      <View style={styles.adviceText}>
                        <Text>
                          {markdownText(advice.text)}
                        </Text>
                      </View>
                    </View>
                  ))
                }            
              </View>
              </View>

          </View>

          <View style={styles.footer} fixed>
            <Text style={styles.footerNote}>Fiche révisée par un professionnel de santé et générée le {currDate.getDate().toString().padStart(2, "0")}/{(currDate.getMonth()+1).toString().padStart(2, "0")}/{currDate.getFullYear()}</Text>
            <Text style={styles.numPage} render={({ pageNumber, totalPages }) => (
              `${pageNumber}/${totalPages}`
            )} fixed />
          </View>

        </Page>

        <Page size="A4" style={[styles.page, styles.normalBody]}>

          <View style={styles.header} fixed>
            <View style={styles.headerText}>
              <Text style={{fontFamily: "RobotoSlab", fontSize:"15pt"}}>{this.props.name}<Text  style={{fontFamily: "Lato"}}>, {this.props.address.dest}</Text></Text>
            </View>
          </View>
          
          <View style={styles.centralSection}>
          {
            this.props.sections?.map((section, index) => (
              <View style={{marginBottom: "5mm"}} key={index}>
                <Text style={styles.subtitle}>{section.title}</Text>
                <View style={styles.hrline}></View>
                <Text>
                  {markdownText(section.text)}
                </Text>
              </View>
              
            ))
          }
          </View>

          <View style={styles.footer} fixed>
            <Text style={styles.footerNote}>Fiche révisée par un professionnel de santé et générée le {currDate.getDate().toString().padStart(2, "0")}/{(currDate.getMonth()+1).toString().padStart(2, "0")}/{currDate.getFullYear()}</Text>
            <Text style={styles.numPage} render={({ pageNumber, totalPages }) => (
              `${pageNumber}/${totalPages}`
            )} fixed />
          </View>
        </Page>
      </Document>
    );
  }
}