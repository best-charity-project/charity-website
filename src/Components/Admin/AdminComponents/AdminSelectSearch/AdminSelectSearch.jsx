import React, {Component} from 'react';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import '../AdminSelectSearch/AdminSelectSearch.css'
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';
class AdminSelectSearch extends Component {
    state = {
        filters: this.props.filtersList
    }
    componentDidMount(){
        this.createOptions()
    }
    createOptions = () =>{
        let array = [];
        if(this.state.filters){
            this.state.filters.forEach(function(item, index){
                let filter = {};
                filter.label= item.title;
                filter.value = index;
                array.push(filter)
            })

        }
     this.setState({filters:array})
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }
    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        return (
            <div className="search-projects">
                  <Select
          disabled={this.state.disabled}
          style={{ width: 500 }}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onInputKeyDown={this.onKeyDown}
          notFoundContent=""
          allowClear
          placeholder="please select"
          value={this.state.value}
          combobox
          backfill
        >
          <Option value="jack">
            <b style={{ color: 'red' }}>jack</b>
          </Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>disabled</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
            </div>
        )
    }
}

export default AdminSelectSearch;