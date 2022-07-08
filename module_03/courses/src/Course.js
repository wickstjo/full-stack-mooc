import { Fragment } from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ data }) => { return (
    <Fragment>
        <Header text={ data.name + ' (' + data.id + ')' } />
        <Content data={ data.parts } />
    </Fragment>
)}

export default Course;