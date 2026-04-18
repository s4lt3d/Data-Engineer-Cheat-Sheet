(function () {
  const glossary = {
    "acid": "Atomicity, Consistency, Isolation, Durability",
    "adaptive query execution": "Spark feature that changes join strategy and partition sizing at runtime.",
    "aqe": "Adaptive Query Execution",
    "api": "Application Programming Interface",
    "apis": "Application Programming Interfaces",
    "aws": "Amazon Web Services",
    "backfill": "Rerunning or loading historical data for intervals that were missed or need correction.",
    "backfills": "Reruns or loads of historical data for intervals that were missed or need correction.",
    "bi": "Business Intelligence",
    "broadcast join": "Join strategy that sends the smaller table to every worker to avoid a large shuffle.",
    "broadcast joins": "Join strategies that send the smaller table to every worker to avoid a large shuffle.",
    "catalog": "System that tracks datasets, schemas, metadata, permissions, and discoverability.",
    "cdc": "Change Data Capture",
    "ci": "Continuous Integration",
    "ci/cd": "Continuous Integration and Continuous Delivery",
    "cli": "Command-Line Interface",
    "consumer": "Person, dashboard, service, or process that depends on a dataset.",
    "consumers": "People, dashboards, services, or processes that depend on a dataset.",
    "contract": "Agreed expectations for a dataset's schema, meaning, cadence, and quality.",
    "contracts": "Agreed expectations for datasets' schemas, meaning, cadence, and quality.",
    "csv": "Comma-Separated Values",
    "csvs": "Comma-Separated Values files",
    "cte": "Common Table Expression",
    "ctes": "Common Table Expressions",
    "dag": "Directed Acyclic Graph",
    "dags": "Directed Acyclic Graphs",
    "data interval": "The time window a scheduled run is responsible for processing.",
    "data intervals": "The time windows scheduled runs are responsible for processing.",
    "data product": "Dataset or data service with an owner, contract, consumers, and operational expectations.",
    "data products": "Datasets or data services with owners, contracts, consumers, and operational expectations.",
    "db": "Database",
    "dbs": "Databases",
    "dbt": "data build tool",
    "ddl": "Data Definition Language",
    "dimension": "Descriptive table keyed around entities like users or products, used to join and filter facts.",
    "dimensions": "Descriptive tables keyed around entities like users or products, used to join and filter facts.",
    "dlt": "Delta Live Tables",
    "dml": "Data Manipulation Language",
    "elt": "Extract, Load, Transform",
    "etl": "Extract, Transform, Load",
    "exposure": "dbt object that documents a downstream dashboard, application, or external consumer.",
    "exposures": "dbt objects that document downstream dashboards, applications, or external consumers.",
    "fact": "Table whose rows represent business events or measurements at a specific grain.",
    "facts": "Tables whose rows represent business events or measurements at specific grains.",
    "freshness": "How recently data was updated compared with the expected arrival time.",
    "grain": "What one row represents in a table or model.",
    "html": "HyperText Markup Language",
    "iam": "Identity and Access Management",
    "idempotency": "Property where rerunning the same job produces the same result without duplicate side effects.",
    "i/o": "Input and Output",
    "iot": "Internet of Things",
    "json": "JavaScript Object Notation",
    "lakehouse": "Architecture that combines data-lake storage with warehouse-style tables, governance, and SQL access.",
    "lineage": "The upstream and downstream dependency path for a dataset or model.",
    "logical_date": "Airflow label for the start of a run's data interval.",
    "mart": "Curated business-facing table or view built for a domain, dashboard, or use case.",
    "marts": "Curated business-facing tables or views built for domains, dashboards, or use cases.",
    "materialized view": "Precomputed query result stored for faster reads and refreshed on a schedule or trigger.",
    "materialized views": "Precomputed query results stored for faster reads and refreshed on a schedule or trigger.",
    "medallion": "Bronze, silver, and gold layering pattern for raw, cleaned, and business-ready data.",
    "ml": "Machine Learning",
    "oltp": "Online Transaction Processing",
    "partition": "Logical split of data used for storage layout, filtering, or distributed parallelism.",
    "partitions": "Logical splits of data used for storage layout, filtering, or distributed parallelism.",
    "pdf": "Portable Document Format",
    "pdfs": "Portable Document Format files",
    "pii": "Personally Identifiable Information",
    "pr": "Pull Request",
    "prs": "Pull Requests",
    "producer": "System or team that creates and publishes data for others to consume.",
    "producers": "Systems or teams that create and publish data for others to consume.",
    "qa": "Quality Assurance",
    "rca": "Root Cause Analysis",
    "s3": "Amazon Simple Storage Service",
    "saas": "Software as a Service",
    "schema": "The columns, types, and structure of a dataset or table.",
    "schema drift": "Unexpected change in incoming columns, types, or nested structure from the source.",
    "schemas": "The columns, types, and structures of datasets or tables.",
    "scd": "Slowly Changing Dimension",
    "scd type 2": "History-tracking pattern that keeps old versions of a row instead of overwriting them.",
    "semantic layer": "Business-friendly definitions for metrics and entities shared across tools and consumers.",
    "serving layer": "Curated tables or views optimized for downstream dashboards, apps, or extracts.",
    "serving layers": "Curated tables or views optimized for downstream dashboards, apps, or extracts.",
    "shuffle": "Redistribution of data across workers for joins, aggregations, or repartitioning.",
    "skew": "Uneven data distribution where one partition or task does much more work than the rest.",
    "sla": "Service-Level Agreement",
    "slas": "Service-Level Agreements",
    "snapshot": "Stored historical version of changing rows over time.",
    "snapshots": "Stored historical versions of changing rows over time.",
    "source": "Upstream table, file, service, or event stream being ingested.",
    "source system": "Upstream application, database, file feed, or service where data originates.",
    "source systems": "Upstream applications, databases, file feeds, or services where data originates.",
    "sources": "Upstream tables, files, services, or event streams being ingested.",
    "sql": "Structured Query Language",
    "ssh": "Secure Shell",
    "streaming table": "Continuously updated table maintained from streaming or incremental inputs.",
    "streaming tables": "Continuously updated tables maintained from streaming or incremental inputs.",
    "time travel": "Ability to query or restore a previous version of a table.",
    "ui": "User Interface",
    "udf": "User-Defined Function",
    "udfs": "User-Defined Functions",
    "utc": "Coordinated Universal Time",
    "watermark": "Value that tracks how far a pipeline has processed source changes or event time.",
    "watermarks": "Values that track how far pipelines have processed source changes or event time.",
    "wlm": "Workload Management",
    "yaml": "YAML Ain't Markup Language",
    "zero-etl": "Moving supported operational data into analytics systems with minimal custom ingestion code."
  };

  const excludedSelector = "pre, code, script, style, noscript, .tooltip-term, .no-tooltips";
  const glossaryByKey = new Map(Object.entries(glossary));
  const escapedTerms = [...glossaryByKey.keys()]
    .sort((left, right) => right.length - left.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(
    `(^|[^A-Za-z0-9])(${escapedTerms.join("|")})(?=$|[^A-Za-z0-9])`,
    "gi"
  );

  function shouldSkip(node) {
    const parent = node.parentElement;
    if (!parent) {
      return true;
    }

    return Boolean(parent.closest(excludedSelector));
  }

  function setOpenState(element, isOpen) {
    element.classList.toggle("is-open", isOpen);
    element.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  function closeOpenTooltips(except) {
    document.querySelectorAll(".tooltip-term.is-open").forEach((tooltip) => {
      if (tooltip !== except) {
        setOpenState(tooltip, false);
      }
    });
  }

  function buildTooltip(term) {
    const normalized = term.toLowerCase();
    const expansion = glossaryByKey.get(normalized);
    const tooltip = document.createElement("span");

    tooltip.className = "tooltip-term";
    tooltip.tabIndex = 0;
    tooltip.textContent = term;
    tooltip.setAttribute("data-tooltip", expansion);
    tooltip.setAttribute("aria-label", `${term}: ${expansion}`);
    tooltip.setAttribute("aria-expanded", "false");

    return tooltip;
  }

  function decorateTextNode(node) {
    const text = node.nodeValue;
    if (!text || !text.trim()) {
      return;
    }

    matcher.lastIndex = 0;
    let match = matcher.exec(text);
    if (!match) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    do {
      const boundary = match[1] || "";
      const term = match[2];
      const start = match.index + boundary.length;
      const end = start + term.length;

      if (start > lastIndex) {
        fragment.append(document.createTextNode(text.slice(lastIndex, start)));
      }

      fragment.append(buildTooltip(term));
      lastIndex = end;
      match = matcher.exec(text);
    } while (match);

    if (lastIndex < text.length) {
      fragment.append(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode.replaceChild(fragment, node);
  }

  function decoratePage() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (shouldSkip(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(decorateTextNode);
  }

  function attachTooltipHandlers() {
    document.addEventListener("click", (event) => {
      const tooltip = event.target.closest(".tooltip-term");
      if (!tooltip) {
        closeOpenTooltips();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const willOpen = !tooltip.classList.contains("is-open");
      closeOpenTooltips(tooltip);
      setOpenState(tooltip, willOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeOpenTooltips();
        return;
      }

      const tooltip = event.target.closest(".tooltip-term");
      if (!tooltip) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const willOpen = !tooltip.classList.contains("is-open");
        closeOpenTooltips(tooltip);
        setOpenState(tooltip, willOpen);
      }
    });
  }

  function initializeTooltips() {
    decoratePage();
    attachTooltipHandlers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTooltips, { once: true });
  } else {
    initializeTooltips();
  }
})();
