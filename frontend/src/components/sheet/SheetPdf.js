import { usePDF } from '@react-pdf/renderer';
import { useState } from 'react';
import Sheet from './Sheet'
import { Box, CircularProgress, Container, Typography } from '@material-ui/core'

const SheetDoc = (sheet, source) => {
    return <Sheet name={sheet.name} address={source} definition={sheet.definition} advices={sheet.advices} sections={sheet.sections} />
}


export const SheetPdf = ({sheet: sheetToRender, source}) => {
    const doc = SheetDoc(sheetToRender, source);
    const [currentSheet, updateCurrentSheet] = useState(sheetToRender)
    const [instance, updateInstance] = usePDF({ document: doc });

    if (sheetToRender !== currentSheet) {
        updateCurrentSheet(sheetToRender)
        updateInstance({ document: doc });
    }

    if (instance.blob === null) return (
        <Box alignItems="center" justifyContent="center" style={{width: "100%"}}>
            <CircularProgress color="secondary"/>
            <Typography>Chargement ...</Typography>
        </Box>
    );

    if (instance.error) return <div>Something went wrong: {error}</div>;

    return (
        <embed src={instance.url} type="application/pdf" width="100%" height="100%"/>
    );
}