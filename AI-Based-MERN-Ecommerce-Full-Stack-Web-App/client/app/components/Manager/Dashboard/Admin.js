/*
 *
 * Admin
 *
 */

import React from "react";

import { Switch, Route } from "react-router-dom";
import { Row, Col } from "reactstrap";

import AccountMenu from "../AccountMenu";
import Page404 from "../../Common/Page404";

import Account from "../../../containers/Account";
import AccountSecurity from "../../../containers/AccountSecurity";
import Address from "../../../containers/Address";
import Order from "../../../containers/Order";
import Users from "../../../containers/Users";
import Category from "../../../containers/Category";
import Product from "../../../containers/Product";
import Brand from "../../../containers/Brand";
import Merchant from "../../../containers/Merchant";
import Review from "../../../containers/Review";
import Wishlist from "../../../containers/WishList";
import Support from "../../../containers/Support";
import Authentication from "../../../containers/Authentication";
import AnalyticsSummary from "./AnalyticsSummary";

const Admin = (props) => {
    const { basePrefix, user } = props;
    return (
        <div className="admin">
            <Row>
                <Col xs="12" md="5" xl="3">
                    <AccountMenu {...props} />
                </Col>
                <Col xs="12" md="7" xl="9">
                    <div className="panel-body">
                        <Switch>
                            <Route
                                exact
                                path={basePrefix}
                                component={Account}
                            />
                            <Route
                                path={`${basePrefix}/security`}
                                component={AccountSecurity}
                            />
                            <Route
                                path={`${basePrefix}/address`}
                                component={Address}
                            />
                            <Route
                                path={`${basePrefix}/product`}
                                component={Product}
                            />
                            <Route
                                path={`${basePrefix}/category`}
                                component={Category}
                            />
                            <Route
                                path={`${basePrefix}/brand`}
                                component={Brand}
                            />
                            <Route
                                path={`${basePrefix}/users`}
                                component={Users}
                            />
                            <Route
                                path={`${basePrefix}/merchant`}
                                component={Merchant}
                            />
                            <Route
                                path={`${basePrefix}/orders`}
                                component={Order}
                            />
                            <Route
                                path={`${basePrefix}/review`}
                                component={Review}
                            />
                            <Route
                                path={`${basePrefix}/analytics`}
                                render={() => <AnalyticsSummary user={user} />}
                            />
                            <Route
                                path={`${basePrefix}/wishlist`}
                                component={Wishlist}
                            />
                            <Route
                                path={`${basePrefix}/support`}
                                component={Authentication(Support)}
                            />
                            <Route path="*" component={Page404} />
                        </Switch>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;
