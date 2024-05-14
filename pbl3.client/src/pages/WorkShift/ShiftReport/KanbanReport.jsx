import { Col, Empty, Row } from "antd";

import CardItem from "./CardItem";
import PropTypes from "prop-types";
KanbanReport.propTypes = {
    data: PropTypes.array.isRequired,
    fetchData: PropTypes.func.isRequired,
};
export default function KanbanReport({ data, fetchData }) {
    return (
        <>
            {data.length > 0 ? (
                <Row gutter={12}>
                    {data &&
                        data.map((item, index) => (
                            <Col
                                key={index}
                                span={8}
                                style={{ margin: "6px 0" }}
                            >
                                <CardItem data={item} fetchData={fetchData} />
                            </Col>
                        ))}
                </Row>
            ) : (
                <Empty />
            )}
        </>
    );
}
