
import React, { Fragment, useMemo } from "react";
import Iframe from "react-iframe";
import Grid from "@mui/material/Grid";


const RenderVideoIframe = (props: any) => {
    const { selectedDeviceInfo } = props;
    const renderVedioIframe = useMemo(() => {
        const updateSelectedDevice = [];
        if (Array.isArray(selectedDeviceInfo) && selectedDeviceInfo.length > 0) {
            for (let i = 0; i < selectedDeviceInfo.length; i++) {
                const { id, vin, feedUrls } = selectedDeviceInfo[i];
                if (Array.isArray(feedUrls) && feedUrls.length > 0) {
                    for (let j = 0; j < feedUrls.length; j++) {
                        updateSelectedDevice.push({
                            renderKey: `${vin}-${j}`, vedioUrl: feedUrls[j]
                        })
                    }
                }
            }
        }
        return updateSelectedDevice;
    }, [selectedDeviceInfo]);
    return (
        <>
            {Array.isArray(renderVedioIframe) &&
                renderVedioIframe.map(item => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={item.renderKey}
                        className="liveframe"
                        style={{ height: "238px", overflow: "hidden" }}
                    >
                        <Iframe
                            url={item.vedioUrl}
                            position="relative"
                            width="100%"
                            id="myId"
                            // className="myClassname"
                            height="300"
                        />
                    </Grid>
                ))

            }
        </>
    )

}

export default React.memo(RenderVideoIframe);