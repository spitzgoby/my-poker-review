import DefaultRangesDialog from './component'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    getIsSelectRangeDialogOpen,
    setSelectRangeDialogOpen
} from 'modules/range-builder'

const mapStateToProps = (state) => ({
    open: getIsSelectRangeDialogOpen(state)
})

const mapDispatchToProps = (dispatch)  => ({
    actions: bindActionCreators({
        setSelectRangeDialogOpen
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRangesDialog)