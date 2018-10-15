import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React, { Component } from "react";
import { InputGroup, InputGroupAddon, Input, ButtonGroup, Button } from "reactstrap";

import { DateRangePicker } from "react-dates";
import TimeKeeper from "react-timekeeper";
import Switch from "react-switch";

import moment from "moment";
import zpad from "zpad";
import "moment/locale/ko";

import { ShopApi } from "api";

export default class MenuSaleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      useDate: props.USEDATE || false,
      startDate: moment(props.STARTDAY || moment().format("YYYYMMDD"), "YYYYMMDD"),
      endDate: moment(props.ENDDAY || moment().format("YYYYMMDD"), "YYYYMMDD"),
      focused: false,

      useTime: props.USETIME || false,
      startTime: {
        hour: Math.floor(props.STARTTIME / 100) || 11,
        minute: props.STARTTIME % 100 || 30
      },
      endTime: {
        hour: Math.floor(props.ENDTIME / 100) || 11,
        minute: props.ENDTIME % 100 || 30
      },
      displayStartTime: false,
      displayEndTime: false,

      useLimit: props.LIMIT === -1 ? false : true,
      limit: props.LIMIT === -1 ? 0 : props.COUNT || 0,

      price: props.PRICE || 0
    };
  }

  handleChangeDate = useDate => this.setState({ useDate });
  handleChangeTime = useTime => this.setState({ useTime });
  handleChangeLimit = useLimit => this.setState({ useLimit });

  onDatesChange = (start, end) => this.setState({ start, end });

  onChangeStartTime = time => this.setState({ startTime: { hour: time.hour24, minute: time.minute } });
  onChangeEndTime = time => this.setState({ endTime: { hour: time.hour24, minute: time.minute } });

  onDoneClick = () => this.setState({ displayStartTime: false, displayEndTime: false });

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onDelete = () => {
    ShopApi.removeMenuSale({ shop: this.props.id, menu: this.props.menu, sale: this.props.sale })
      .then(res => this.props.updateSaleInfo())
      .catch(err => console.log(err));
  };

  onRegister = () => {
    ShopApi.addMenuSale({ shop: this.props.id, menu: this.props.menu, ...this.state })
      .then(res => this.props.updateSaleInfo())
      .catch(err => console.log(err));
  };

  onModify = () => {
    ShopApi.modifyMenuSale({ shop: this.props.id, menu: this.props.menu, sale: this.props.sale, ...this.state })
      .then(res => this.props.updateSaleInfo())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>
          <Switch
            onChange={this.handleChangeDate}
            checked={this.state.useDate}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </td>
        <td>
          <DateRangePicker
            startDate={this.state.startDate}
            startDateId="startDate"
            endDate={this.state.endDate}
            endDateId="endDate"
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput, displayStartTime: false, displayEndTime: false })}
            minimumNights={0}
            small={true}
          />
        </td>

        <td>
          <Switch
            onChange={this.handleChangeTime}
            checked={this.state.useTime}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </td>
        <td>
          <Input
            onClick={() => this.setState({ displayStartTime: !this.state.displayStartTime, displayEndTime: false })}
            readOnly
            style={{ backgroundColor: "#FFF", textAlign: "right" }}
            value={zpad(String(this.state.startTime.hour)) + " : " + zpad(String(this.state.startTime.minute))}
          />
          <div style={{ position: "absolute", zIndex: 999 }} hidden={!this.state.displayStartTime}>
            <TimeKeeper
              time={zpad(String(this.state.startTime.hour)) + ":" + zpad(String(this.state.startTime.minute))}
              onChange={this.onChangeStartTime}
              onDoneClick={this.onDoneClick}
              switchToMinuteOnHourSelect={true}
            />
          </div>
        </td>
        <td>
          <Input
            onClick={() => this.setState({ displayStartTime: false, displayEndTime: !this.state.displayEndTime })}
            readOnly
            style={{ backgroundColor: "#FFF", textAlign: "right" }}
            value={zpad(String(this.state.endTime.hour)) + " : " + zpad(String(this.state.endTime.minute))}
          />
          <div style={{ position: "absolute", zIndex: 999 }} hidden={!this.state.displayEndTime}>
            <TimeKeeper
              time={zpad(String(this.state.endTime.hour)) + ":" + zpad(String(this.state.endTime.minute))}
              onChange={this.onChangeEndTime}
              onDoneClick={this.onDoneClick}
              switchToMinuteOnHourSelect={true}
            />
          </div>
        </td>

        <td>
          <Switch
            onChange={this.handleChangeLimit}
            disabled={!this.props.register}
            checked={this.state.useLimit}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </td>
        <td>
          <InputGroup>
            <Input
              type="number"
              name="limit"
              style={{ textAlign: "right" }}
              value={this.state.limit}
              onChange={this.onChange}
              readOnly={!this.props.register}
            />
            <InputGroupAddon addonType="append">개</InputGroupAddon>
          </InputGroup>
        </td>

        <td>
          <InputGroup>
            <Input type="number" name="price" style={{ textAlign: "right" }} value={this.state.price} onChange={this.onChange} />
            <InputGroupAddon addonType="append">원</InputGroupAddon>
          </InputGroup>
        </td>

        <td>
          <ButtonGroup>
            <Button color="success" onClick={this.props.register ? this.onRegister : this.onModify}>
              {this.props.register ? "추가" : "수정"}
            </Button>
            {this.props.register ? null : (
              <Button color="danger" onClick={this.onDelete}>
                삭제
              </Button>
            )}
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
