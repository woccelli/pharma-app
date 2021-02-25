import React from 'react'
import { Table } from 'react-bootstrap'

const Help = () => {
    return (
        <div>
            <h6>Mise en forme du texte</h6>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Entrée</th>
                        <th>Rendu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>**Toposanté**</td>
                        <td><b>Toposanté</b></td>
                    </tr>
                    <tr>
                        <td>_Toposanté_</td>
                        <td><i>Toposanté</i></td>
                    </tr>
                    <tr>
                        <td>* Topo <br/>* Santé</td>
                        <td><ul><li>Topo</li><li>Santé</li></ul></td>
                    </tr>
                    <tr>
                        <td>1. Topo <br/>2. Santé</td>
                        <td><ol><li>Topo</li><li>Santé</li></ol></td>
                    </tr>
                </tbody>
            </Table>
            <h6>Choix des icônes</h6>
            <a href="https://materialdesignicons.com/" target="_blank" rel="noopener noreferrer">https://materialdesignicons.com/</a>
        </div>
    )
}

export default Help;