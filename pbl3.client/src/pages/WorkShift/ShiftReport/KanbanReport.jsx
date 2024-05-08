import { Col, Row } from "antd";

import CardItem from "./CardItem";
import PropTypes from "prop-types";
KanbanReport.propTypes = {
    data: PropTypes.object.isRequired,
};
export default function KanbanReport({ data }) {
    return (
        <div>
            <Row gutter={12}>
                {data &&
                    data.map((item, index) => (
                        <Col key={index} span={8} style={{ margin: "6px 0" }}>
                            <CardItem data={item} />
                        </Col>
                    ))}
            </Row>
        </div>
    );
}
