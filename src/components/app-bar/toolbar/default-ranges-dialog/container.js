import DefaultRangesDialog from './component'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    getIsSelectRangeDialogOpen,
    setRanges,
    setSelectRangeDialogOpen
} from 'modules/range-builder'

const mapStateToProps = (state) => ({
    open: getIsSelectRangeDialogOpen(state)
})

const mapDispatchToProps = (dispatch)  => ({
    actions: bindActionCreators({
        setRanges,
        setSelectRangeDialogOpen
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRangesDialog)