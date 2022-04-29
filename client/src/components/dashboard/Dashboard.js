import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? <>
            <p>has</p>
            {/*             
            <p>
                <i className="fas fa-user"></i> {profile.company}
            </p>
            <p>
                <i className="fas fa-map-marked-alt"></i> {profile.location}
            </p>
            <p>
                <i className="fas fa-briefcase"></i> {profile.status}
            </p>
            <p>
                <i className="fas fa-phone"></i> {profile.phone}
            </p>
            <p>
                <i className="fas fa-envelope"></i> {profile.email}
            </p>
            <p>
                <i className="fas fa-globe"></i> {profile.website}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.twitter}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.facebook}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.linkedin}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.instagram}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.youtube}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.github}
            </p>
            <p>
                <i className="fas fa-user"></i> {profile.social && profile.social.skype}
            </p> */}
        </> :
            <>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </>
        }
    </>
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Dashboard);