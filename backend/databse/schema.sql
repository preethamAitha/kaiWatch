CREATE TABLE repo_group (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

Create table repo(
	id serial Primary key,
	name VARCHAR(255) NOT NULL,
	group_id serial NOT NULL references repo_group(id) on delete cascade
);
create table image(
	id serial primary key,
	repo_id serial NOT NULL references repo(id) on delete cascade,
    group_id serial NOT NULL references repo_group(id) on delete cascade,
    name VARCHAR(255),
    version VARCHAR(255),
    baseImage VARCHAR(255),
    buildType VARCHAR(255),
    maintainer VARCHAR(255),
    createTime timestamp,
    exposedPorts jsonb,
    exposed boolean
);

create table vulnerability(
    id serial primary key,
    image_id serial not NULL references image(id) on delete cascade,
    cve VARCHAR(255),
    severity VARCHAR(255),
    cvss Numeric(3,1),
    status VARCHAR(255),
    kaiStatus VARCHAR(255),
    cause VARCHAR(255),
    description Text,
    vecStr VARCHAR(255),
    exploit VARCHAR(255),
    link VARCHAR(255),
    type VARCHAR(255),
    packageName VARCHAR(255),
    packageVersion VARCHAR(255),
    packageType VARCHAR(255),
    layerTime timestamp,
    published timestamp,
    fixDate timestamp,
    applicableRules jsonb,
    owner VARCHAR(255),
    advisoryType VARCHAR(255),
    path VARCHAR(255)
);
create table image_metadata(
    id serial primary key,
    imageId serial not null references image(id) on delete cascade,
    totalVulns INTEGER,
    criticalVulns INTEGER,
    highVulns INTEGER,
    mediumVulns INTEGER,
    lowVulns INTEGER,
    unknownVulns INTEGER,
    systemVulns INTEGER,
    userVulns INTEGER,
    noriskVulns INTEGER,
    noriskCriticalVulns INTEGER,
    noriskHighVulns INTEGER,
    noriskMediumVulns INTEGER,
    noriskLowVulns INTEGER,
    noAIRiskVulns INTEGER,
    noAIRiskCriticalVulns INTEGER,
    noAIRiskHighVulns INTEGER,
    noAIRiskMediumVulns INTEGER,
    noAIRiskLowVulns INTEGER
);
create table risk_factor(
    id serial primary key,
    name VARCHAR(255) not null,
    vulnerabilityId serial not null references vulnerability(id) on delete cascade,
    factorName VARCHAR(255),
    factorValue jsonb
);

CREATE INDEX idx_repo_group_id ON repo (group_id);
CREATE INDEX idx_image_repo_id ON image (repo_id);

CREATE INDEX idx_image_group_id ON image (group_id);

CREATE INDEX idx_vulnerability_image_id ON vulnerability (image_id);
CREATE INDEX idx_image_metadata_image_id ON image_metadata (imageId);
CREATE INDEX idx_risk_factor_vuln_id ON risk_factor (vulnerabilityId);

CREATE INDEX idx_vuln_cve ON vulnerability (cve);
CREATE INDEX idx_vuln_kaistatus ON vulnerability (kaiStatus); 
CREATE INDEX idx_vuln_severity ON vulnerability (severity); 
CREATE INDEX idx_vuln_fix_date ON vulnerability (fixDate);
CREATE INDEX idx_image_createtime ON image (createTime);

CREATE INDEX idx_vuln_listing_perf ON vulnerability (image_id, kaiStatus, severity);