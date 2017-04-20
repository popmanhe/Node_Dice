import React, { Component, PropTypes } from 'react';
import '../../lib/jquery.easypiechart.min';
const propTypes = {
    started: PropTypes.bool,
    reset: PropTypes.bool
};

const defaultProps = {};

class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 20,
            timerId: null
        };
    }
    componentDidMount() {
        const $chart = $(this.Chart);
        const s = this.state;
        $chart.easyPieChart({
            size: 300,
            lineWidth: 25,
            easing: 'easeOutBounce',
            barColor: '#3BAFDA',
            trackColor: '#eeeeee',
            onStep: function (from, to, percent) {
                $chart.find('.timeLeft').text(Math.round((1 - percent / 100) * s.timeLeft / 2) + ' sec');
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.started === true)
            this.start(0);
        if (nextProps.reset === true)
            this.reset();
    }
    reset = () => {
        $(this.Chart).data('easyPieChart').update(0);
    }
    start = (step) => {
        const self = this;
        const $chart = $(this.Chart);

        let i = step * 2;
        clearInterval(this.state.timerId);
        let timerId = setInterval(() => {
            $chart.data('easyPieChart').update(i / self.state.timeLeft * 100);
            if (i < self.state.timeLeft) {
                i++;
            }
            else {
                clearInterval(self.state.timerId);
                self.reset();
            }
        }, 500);
        this.setState({ timerId });
    }
    render() {
        return (
            <span className="chart chart-widget-pie lobbyChart" ref={(chart) => { this.Chart = chart; }} data-percent="0">
                <span className="timeLeft">{this.state.timeLeft}</span>
            </span>
        );
    }
}
CountDown.propTypes = propTypes;

CountDown.defaultProps = defaultProps;

export default CountDown;
