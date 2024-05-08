import { Col, Row } from "antd";
import PropTypes from "prop-types";

import CardBonus from "./CardBonus";
KanbanBonus.propTypes = {
    data: PropTypes.array.isRequired,
};
export default function KanbanBonus({ data }) {
    return (
        <div>
            <Row gutter={12}>
                {data &&
                    data.map((item, index) => (
                        <Col key={index} span={8} style={{ margin: "6px 0" }}>
                            <CardBonus data={item} />
                        </Col>
                    ))}
            </Row>
        </div>
    );
}
