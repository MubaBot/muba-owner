import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React, { Component } from "react";

import { DateRangePicker } from "react-dates";
import TimeKeeper from "react-timekeeper";
import Switch from "react-switch";
import accounting from "accounting-js";
import { isEqual } from "lodash";

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

  componentWillReceiveProps = nextProps => {
    this.setState({
      useDate: nextProps.USEDATE || false,
      startDate: moment(nextProps.STARTDAY || moment().format("YYYYMMDD"), "YYYYMMDD"),
      endDate: moment(nextProps.ENDDAY || moment().format("YYYYMMDD"), "YYYYMMDD"),
      focused: false,

      useTime: nextProps.USETIME || false,
      startTime: {
        hour: Math.floor(nextProps.STARTTIME / 100) || 11,
        minute: nextProps.STARTTIME % 100 || 30
      },
      endTime: {
        hour: Math.floor(nextProps.ENDTIME / 100) || 11,
        minute: nextProps.ENDTIME % 100 || 30
      },
      displayStartTime: false,
      displayEndTime: false,

      useLimit: nextProps.LIMIT === -1 ? false : true,
      limit: nextProps.LIMIT === -1 ? 0 : nextProps.COUNT || 0,

      price: nextProps.PRICE || 0
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      isEqual(nextState.useDate, this.state.useDate) &&
      isEqual(nextState.startDate, this.state.startDate) &&
      isEqual(nextState.endDate, this.state.endDate) &&
      isEqual(nextState.focused, this.state.focused) &&
      isEqual(nextState.useTime, this.state.useTime) &&
      isEqual(nextState.startTime, this.state.startTime) &&
      isEqual(nextState.endTime, this.state.endTime) &&
      isEqual(nextState.displayStartTime, this.state.displayStartTime) &&
      isEqual(nextState.displayEndTime, this.state.displayEndTime) &&
      isEqual(nextState.useLimit, this.state.useLimit) &&
      isEqual(nextState.limit, this.state.limit) &&
      isEqual(nextState.price, this.state.price)
    )
      return false;

    return true;
  };

  componentDidUpdate = () => (this.props.register ? null : this.onModify());

  handleChangeDate = useDate => this.setState({ useDate });
  handleChangeTime = useTime => this.setState({ useTime });
  handleChangeLimit = useLimit => this.setState({ useLimit });

  onDatesChange = (start, end) => this.setState({ start, end });

  onChangeStartTime = time => this.setState({ startTime: { hour: time.hour24, minute: time.minute } });
  onChangeEndTime = time => this.setState({ endTime: { hour: time.hour24, minute: time.minute } });

  onDoneClick = () => this.setState({ displayStartTime: false, displayEndTime: false });

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onChangeCount = e => {
    const num = e.target.value.replace(/,/gi, "");
    if (parseInt(num, 10) >= 0) {
      this.setState({ limit: parseInt(num, 10) });
    } else {
      this.setState({ limit: 0 });
    }
  };
  onChangePrice = e => {
    const num = e.target.value.replace(/,/gi, "");
    if (parseInt(num, 10) >= 0) {
      this.setState({ price: parseInt(num, 10) });
    } else {
      this.setState({ price: 0 });
    }
  };

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
            className="switch"
            onChange={this.handleChangeDate}
            checked={this.state.useDate}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
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
            customArrowIcon={<span>~</span>}
          />
        </td>

        <td>
          <Switch
            className="switch"
            onChange={this.handleChangeTime}
            checked={this.state.useTime}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
            width={48}
          />
        </td>
        <td className="row">
          <div>
            <input
              onClick={() => this.setState({ displayStartTime: !this.state.displayStartTime, displayEndTime: false })}
              readOnly
              style={{ backgroundColor: "#FFF" }}
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
          </div>
          <span>~</span>
          <div>
            <input
              onClick={() => this.setState({ displayStartTime: false, displayEndTime: !this.state.displayEndTime })}
              readOnly
              style={{ backgroundColor: "#FFF" }}
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
          </div>
        </td>

        <td>
          <Switch
            className="switch"
            onChange={this.handleChangeLimit}
            disabled={!this.props.register}
            checked={this.state.useLimit}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
            width={48}
          />
        </td>
        <td>
          <div className="price">
            <input
              type="text"
              name="limit"
              value={accounting.formatMoney(this.state.limit, { symbol: "", format: "%v", precision: 0 })}
              placeholder="할인 개수"
              onChange={this.onChangeCount}
              readOnly={!this.props.register}
            />
            <span>개</span>
          </div>
        </td>

        <td>
          <div className="price">
            <input
              type="text"
              name="price"
              value={accounting.formatMoney(this.state.price, { symbol: "", format: "%v", precision: 0 })}
              placeholder="가격"
              onChange={this.onChangePrice}
              readOnly={!this.props.register}
            />
            <span>원</span>
          </div>
        </td>

        <td>
          <button className={this.props.register ? "add event" : "delete event"} onClick={this.props.register ? this.onRegister : this.onDelete}>
            {this.props.register ? "추가" : "삭제"}
          </button>
        </td>
      </tr>
    );
  }
}
