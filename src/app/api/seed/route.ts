import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Clear existing data
    await db.submission.deleteMany()
    await db.lessonProgress.deleteMany()
    await db.userBadge.deleteMany()
    await db.streakLog.deleteMany()
    await db.dailyChallengeAttempt.deleteMany()
    await db.submission.deleteMany()
    await db.exercise.deleteMany()
    await db.lesson.deleteMany()
    await db.module.deleteMany()
    await db.learningPath.deleteMany()
    await db.userBadge.deleteMany()
    await db.badge.deleteMany()
    await db.user.deleteMany()

    // Create Badges
    const badgeData = [
      { name: 'First Steps', description: 'Complete your first exercise', icon: '🎯', category: 'GRIND', rarity: 'COMMON', triggerValue: 1 },
      { name: 'Getting Warmed Up', description: 'Complete 10 exercises', icon: '🔥', category: 'GRIND', rarity: 'COMMON', triggerValue: 10 },
      { name: 'Code Warrior', description: 'Complete 50 exercises', icon: '⚔️', category: 'GRIND', rarity: 'RARE', triggerValue: 50 },
      { name: 'Century', description: 'Complete 100 exercises', icon: '💯', category: 'GRIND', rarity: 'EPIC', triggerValue: 100 },
      { name: 'Kilobyte', description: 'Complete 1000 exercises', icon: '🏗️', category: 'GRIND', rarity: 'LEGENDARY', triggerValue: 1000 },
      { name: '3-Day Streak', description: 'Maintain a 3-day learning streak', icon: '📅', category: 'STREAK', rarity: 'COMMON', triggerValue: 3 },
      { name: '7-Day Streak', description: 'Maintain a 7-day learning streak', icon: '💪', category: 'STREAK', rarity: 'RARE', triggerValue: 7 },
      { name: '30-Day Streak', description: 'Maintain a 30-day learning streak', icon: '⚡', category: 'STREAK', rarity: 'EPIC', triggerValue: 30 },
      { name: 'Unbreakable', description: 'Maintain a 100-day learning streak', icon: '💎', category: 'STREAK', rarity: 'LEGENDARY', triggerValue: 100 },
      { name: 'Level 5', description: 'Reach Level 5', icon: '⭐', category: 'LEVEL', rarity: 'COMMON', triggerValue: 5 },
      { name: 'Level 10', description: 'Reach Level 10', icon: '🌟', category: 'LEVEL', rarity: 'COMMON', triggerValue: 10 },
      { name: 'Level 25', description: 'Reach Level 25', icon: '💫', category: 'LEVEL', rarity: 'RARE', triggerValue: 25 },
      { name: 'Level 50', description: 'Reach Level 50', icon: '🏅', category: 'LEVEL', rarity: 'EPIC', triggerValue: 50 },
      { name: 'CodeForge Master', description: 'Reach Level 100', icon: '👑', category: 'LEVEL', rarity: 'MYTHIC', triggerValue: 100 },
      { name: 'XP Hunter', description: 'Earn 1000 XP', icon: '✨', category: 'XP', rarity: 'COMMON', triggerValue: 1000 },
      { name: 'XP Legend', description: 'Earn 10000 XP', icon: '🌈', category: 'XP', rarity: 'EPIC', triggerValue: 10000 },
      { name: 'Night Owl', description: 'Complete an exercise between midnight and 5 AM', icon: '🦉', category: 'STREAK', rarity: 'RARE', triggerValue: 0 },
      { name: 'Speed Demon', description: 'Complete an exercise in under 30 seconds', icon: '💨', category: 'GRIND', rarity: 'RARE', triggerValue: 0 },
    ]

    for (const b of badgeData) {
      await db.badge.create({ data: b })
    }

    // Create Learning Paths
    const javaPath = await db.learningPath.create({
      data: {
        title: 'Java Fundamentals',
        slug: 'java-fundamentals',
        description: 'Master Java from variables to concurrency. Every concept is taught through real-world scenarios — not toy examples.',
        icon: '☕',
        color: '#f97316',
        targetAudience: 'Beginners + PHP devs',
        estimatedLessons: 12,
        order: 1
      }
    })

    const springPath = await db.learningPath.create({
      data: {
        title: 'Spring Boot Backend',
        slug: 'spring-boot-backend',
        description: 'Build production-ready REST APIs with Spring Boot, including security, testing, and deployment.',
        icon: '🍃',
        color: '#22c55e',
        targetAudience: 'Know Java, new to Spring',
        estimatedLessons: 8,
        order: 2
      }
    })

    const dsaPath = await db.learningPath.create({
      data: {
        title: 'DSA in Java',
        slug: 'dsa-in-java',
        description: 'Ace your coding interviews with comprehensive data structures and algorithms practice.',
        icon: '🧮',
        color: '#a855f7',
        targetAudience: 'Interview prep',
        estimatedLessons: 10,
        order: 3
      }
    })

    const aiPath = await db.learningPath.create({
      data: {
        title: 'AI/ML with Java',
        slug: 'ai-ml-java',
        description: 'Build real ML models using Java — from classical ML with Weka to deep learning with DL4J.',
        icon: '🤖',
        color: '#ec4899',
        targetAudience: 'New to AI/ML',
        estimatedLessons: 8,
        order: 4
      }
    })

    const llmPath = await db.learningPath.create({
      data: {
        title: 'LLM Integration',
        slug: 'llm-integration',
        description: 'Integrate LLMs into your Java apps — prompt engineering, RAG systems, vector DBs, and agents.',
        icon: '🧠',
        color: '#06b6d4',
        targetAudience: 'Anyone curious about LLMs',
        estimatedLessons: 6,
        order: 5
      }
    })

    // ===== JAVA FUNDAMENTALS MODULES & LESSONS =====
    const m1 = await db.module.create({ data: { title: 'Variables & Data Types', description: 'The building blocks of every Java program', order: 1, pathId: javaPath.id } })
    const m2 = await db.module.create({ data: { title: 'Control Flow', description: 'Making decisions and repeating actions', order: 2, pathId: javaPath.id } })
    const m3 = await db.module.create({ data: { title: 'Object-Oriented Programming', description: 'Classes, objects, inheritance, and polymorphism', order: 3, pathId: javaPath.id } })
    const m4 = await db.module.create({ data: { title: 'Collections Framework', description: 'Lists, sets, maps — the data structures you will use every day', order: 4, pathId: javaPath.id } })
    const m5 = await db.module.create({ data: { title: 'Exceptions & Error Handling', description: 'Writing robust code that handles the unexpected', order: 5, pathId: javaPath.id } })
    const m6 = await db.module.create({ data: { title: 'Streams & Lambdas', description: 'Functional-style programming in Java', order: 6, pathId: javaPath.id } })

    // Module 1 Lessons
    const l1 = await db.lesson.create({
      data: { title: 'Your First Java Program', slug: 'first-java-program', difficulty: 'STANDARD',
        contextIntro: "You are joining a new team that builds payment processing software. Before writing any real code, you need to understand how Java programs are structured.",
        skillTags: 'Basics,Variables', order: 1, moduleId: m1.id,
        content: `# Your First Java Program

## The Scenario
Imagine you just joined a fintech startup. Your first task: write a simple program that calculates the total charge for a customer's order. But before tackling that, you need to understand the fundamentals.

## The Structure of a Java Program

Every Java program needs at least one **class** and one **main method**. This is where execution begins.

\`\`\`java
public class OrderProcessor {
    public static void main(String[] args) {
        System.out.println("Order processing started...");
    }
}
\`\`\`

### Key Concepts

- **\`public class\`** — A class is a blueprint. Every Java file needs one.
- **\`public static void main(String[] args)\`** — The entry point. The JVM calls this method first.
- **\`System.out.println()\`** — Prints output to the console.

### Variables — Storing Data

In Java, every variable has a **type**. This is different from languages like PHP or JavaScript where types are loose.

\`\`\`java
int orderCount = 5;           // Whole numbers
double pricePerItem = 29.99; // Decimal numbers
String customerName = "Aman"; // Text
boolean isPremium = true;     // True/false
char grade = 'A';            // Single character
\`\`\`

### Why Types Matter

You are building a payment system. A type mismatch — adding a String to an int — would crash the system at runtime. Java's type system catches these errors **at compile time**, before your code ever reaches production.

This is why companies like Netflix, LinkedIn, and Amazon choose Java for mission-critical systems.
` }
    })

    await db.exercise.create({
      data: {
        title: 'Create a Simple Order Summary', type: 'UNIT_TEST',
        description: 'Create a class \`OrderSummary\` with a main method that declares variables for an order: \`itemCount\` (int, value 3), \`pricePerItem\` (double, value 19.99), and \`customerName\` (String, "Aman"). Calculate \`totalPrice\` by multiplying itemCount by pricePerItem, then print: "Customer: [name], Items: [count], Total: $[total]".',
        starterCode: 'public class OrderSummary {\n    public static void main(String[] args) {\n        // Declare your variables here\n        \n        \n        \n        // Calculate total and print\n        \n    }\n}',
        referenceSolution: 'public class OrderSummary {\n    public static void main(String[] args) {\n        int itemCount = 3;\n        double pricePerItem = 19.99;\n        String customerName = "Aman";\n        double totalPrice = itemCount * pricePerItem;\n        System.out.println("Customer: " + customerName + ", Items: " + itemCount + ", Total: $" + totalPrice);\n    }\n}',
        testCode: 'Test OrderSummary with itemCount=3, pricePerItem=19.99',
        hints: '["You need to declare three variables: int, double, and String", "Multiply itemCount by pricePerItem to get totalPrice", "Use System.out.println with string concatenation using +"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l1.id
      }
    })

    const l2 = await db.lesson.create({
      data: { title: 'Primitive vs Reference Types', slug: 'primitive-vs-reference', difficulty: 'STANDARD',
        contextIntro: 'Your payment system needs to handle different types of data — amounts, names, statuses. Understanding how Java stores data in memory is critical for writing efficient code.',
        skillTags: 'Basics,Types', order: 2, moduleId: m1.id,
        content: `# Primitive vs Reference Types

## The Scenario
Your team lead asks: "Why do we use \`BigDecimal\` for currency instead of \`double\`?" If you cannot answer this, you are not ready to write financial software.

## Primitive Types (Value Types)

Primitives store the **actual value** directly in memory. They are fast and lightweight.

| Type | Size | Range | Example Use |
|------|------|-------|-------------|
| \`byte\` | 1 byte | -128 to 127 | File I/O buffers |
| \`short\` | 2 bytes | -32K to 32K | Small counters |
| \`int\` | 4 bytes | ~2 billion | General purpose |
| \`long\` | 8 bytes | ~9 quintillion | Timestamps |
| \`float\` | 4 bytes | 7 decimal digits | Graphics |
| \`double\` | 8 bytes | 15 decimal digits | Calculations |
| \`boolean\` | 1 bit | true/false | Flags |
| \`char\` | 2 bytes | Unicode char | Characters |

## Reference Types

Reference types store a **pointer** to the actual data in memory (the heap).

\`\`\`java
// String is a reference type
String name = new String("Aman");  // Full form
String name2 = "Aman";            // Shortcut (interned)

// Arrays are reference types
int[] orders = new int[10];
orders[0] = 42;
\`\`\`

## The \`double\` Trap

\`\`\`java
System.out.println(0.1 + 0.2);  // Prints: 0.30000000000000004
\`\`\`

This is why financial software uses \`BigDecimal\`:

\`\`\`java
import java.math.BigDecimal;

BigDecimal price = new BigDecimal("19.99");
BigDecimal tax = new BigDecimal("0.08");
BigDecimal total = price.multiply(price.add(tax));  // Precise!
\`\`\`

### Key Takeaway
Primitives for performance, \`BigDecimal\`/\`String\` for precision and text.
` }
    })

    await db.exercise.create({
      data: {
        title: 'Fix the Floating Point Bug', type: 'CODE_REPAIR',
        description: 'The following code has a bug: \`double total = 0.1 + 0.2;\` and then prints \`"Total: " + total\`. The output shows \`0.30000000000000004\` instead of \`0.3\`. Fix this by using \`BigDecimal\` to compute the sum precisely, then print the result.',
        starterCode: 'import java.math.BigDecimal;\n\npublic class PrecisionFix {\n    public static void main(String[] args) {\n        // BUG: This gives 0.30000000000000004\n        double total = 0.1 + 0.2;\n        System.out.println("Total: " + total);\n        \n        // YOUR FIX: Use BigDecimal here\n        \n    }\n}',
        referenceSolution: 'import java.math.BigDecimal;\n\npublic class PrecisionFix {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal("0.1");\n        BigDecimal b = new BigDecimal("0.2");\n        BigDecimal total = a.add(b);\n        System.out.println("Total: " + total);\n    }\n}',
        testCode: 'Verify BigDecimal produces exact 0.3',
        hints: '["Create BigDecimal objects using new BigDecimal(\"0.1\") — note: use String constructor", "Use .add() method to sum two BigDecimal values"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l2.id
      }
    })

    // Module 2: Control Flow
    const l3 = await db.lesson.create({
      data: { title: 'If-Else & Switch', slug: 'if-else-switch', difficulty: 'STANDARD',
        contextIntro: "Your e-commerce platform needs to apply different discount rules based on customer tier: BRONZE gets 5%, SILVER gets 10%, GOLD gets 15%, PLATINUM gets 20%. Time to learn control flow.",
        skillTags: 'Control Flow,Conditionals', order: 1, moduleId: m2.id,
        content: `# If-Else & Switch Expressions

## The Scenario
Your company's pricing engine needs to apply tiered discounts. A \`switch\` expression (Java 14+) is perfect for this.

## If-Else
\`\`\`java
int orderTotal = 500;

if (orderTotal >= 1000) {
    System.out.println("Free shipping!");
} else if (orderTotal >= 500) {
    System.out.println("Discounted shipping: $5");
} else {
    System.out.println("Standard shipping: $10");
}
\`\`\`

## Switch Expression (Java 14+)
\`\`\`java
String tier = "GOLD";

// Modern switch expression with arrow syntax
double discount = switch (tier) {
    case "BRONZE"  -> 0.05;
    case "SILVER"  -> 0.10;
    case "GOLD"    -> 0.15;
    case "PLATINUM" -> 0.20;
    default        -> 0.0;
};

System.out.println("Discount: " + (discount * 100) + "%");
\`\`\`

### Pattern Matching (Java 21)
\`\`\`java
Object value = 42;

String result = switch (value) {
    case Integer i when i > 0 -> "Positive integer: " + i;
    case Integer i -> "Non-positive integer: " + i;
    case String s -> "String: " + s;
    case null     -> "null value";
    default       -> "Unknown type";
};
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Discount Calculator', type: 'UNIT_TEST',
        description: 'Create a method \`public static double calculateDiscount(String tier, double orderTotal)\` that returns the discounted total. BRONZE: 5%, SILVER: 10%, GOLD: 15%, PLATINUM: 20%. Use a switch expression. If tier is null or unknown, return the orderTotal unchanged.',
        starterCode: 'public class DiscountCalculator {\n    public static double calculateDiscount(String tier, double orderTotal) {\n        // Implement using switch expression\n        return orderTotal;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(calculateDiscount("GOLD", 1000)); // Should print 850.0\n    }\n}',
        referenceSolution: 'public class DiscountCalculator {\n    public static double calculateDiscount(String tier, double orderTotal) {\n        if (tier == null) return orderTotal;\n        double discountRate = switch (tier) {\n            case "BRONZE" -> 0.05;\n            case "SILVER" -> 0.10;\n            case "GOLD" -> 0.15;\n            case "PLATINUM" -> 0.20;\n            default -> 0.0;\n        };\n        return orderTotal * (1 - discountRate);\n    }\n    public static void main(String[] args) {\n        System.out.println(calculateDiscount("GOLD", 1000));\n    }\n}',
        testCode: 'Test calculateDiscount with all tiers and null',
        hints: '["Use switch expression with arrow syntax (->)", "Return orderTotal * (1 - discountRate)", "Handle null tier with an if check before the switch"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l3.id
      }
    })

    const l4 = await db.lesson.create({
      data: { title: 'Loops: For, While, Enhanced For', slug: 'loops', difficulty: 'STANDARD',
        contextIntro: 'You need to process a batch of 10,000 orders from a database. A loop lets you iterate through each record, validate it, and calculate totals.',
        skillTags: 'Control Flow,Loops', order: 2, moduleId: m2.id,
        content: `# Loops in Java

## The Scenario
Your payment gateway receives a list of transactions. You need to process each one, validate it, and calculate the total. Loops make this possible.

## For Loop
\`\`\`java
int[] transactions = {150, 200, 75, 300, 50};
int total = 0;

for (int i = 0; i < transactions.length; i++) {
    if (transactions[i] > 0) {
        total += transactions[i];
    }
}
\`\`\`

## Enhanced For Loop (For-Each)
\`\`\`java
for (int amount : transactions) {
    System.out.println("Processing: $" + amount);
}
\`\`\`

## While Loop
\`\`\`java
int retries = 0;
while (retries < 3) {
    boolean success = attemptConnection();
    if (success) break;
    retries++;
}
\`\`\`

## Streams vs Loops
\`\`\`java
// Traditional loop
int count = 0;
for (int t : transactions) {
    if (t > 100) count++;
}

// Stream (we will cover this in detail later)
long streamCount = Arrays.stream(transactions).filter(t -> t > 100).count();
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Process Transaction Batch', type: 'UNIT_TEST',
        description: 'Write a method \`public static int processTransactions(int[] amounts)\` that returns the sum of all positive amounts. If the array is null, return 0. If any amount is negative, skip it (it is a refund, handled separately).',
        starterCode: 'public class TransactionProcessor {\n    public static int processTransactions(int[] amounts) {\n        // Sum all positive amounts\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] txns = {100, -50, 200, 75, -25, 300};\n        System.out.println(processTransactions(txns)); // Should print 675\n    }\n}',
        referenceSolution: 'public class TransactionProcessor {\n    public static int processTransactions(int[] amounts) {\n        if (amounts == null) return 0;\n        int total = 0;\n        for (int amount : amounts) {\n            if (amount > 0) {\n                total += amount;\n            }\n        }\n        return total;\n    }\n    public static void main(String[] args) {\n        int[] txns = {100, -50, 200, 75, -25, 300};\n        System.out.println(processTransactions(txns));\n    }\n}',
        testCode: 'Test with positive, negative, null, and empty arrays',
        hints: '["Check for null first — return 0 if null", "Use enhanced for loop to iterate", "Only add to total if amount > 0"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l4.id
      }
    })

    // Module 3: OOP
    const l5 = await db.lesson.create({
      data: { title: 'Classes & Objects', slug: 'classes-objects', difficulty: 'STANDARD',
        contextIntro: 'You are building a user management system. Each user has a name, email, and role. Classes let you model these real-world entities with both data and behavior.',
        skillTags: 'OOP,Classes,Objects', order: 1, moduleId: m3.id,
        content: `# Classes & Objects

## The Scenario
Your startup needs a User class for its authentication system. Users have properties (name, email, role) and behaviors (login, logout, hasPermission).

## Defining a Class
\`\`\`java
public class User {
    // Fields (instance variables)
    private String name;
    private String email;
    private String role;
    private boolean isActive;

    // Constructor
    public User(String name, String email, String role) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.isActive = true;
    }

    // Methods (behaviors)
    public boolean hasPermission(String permission) {
        if ("ADMIN".equals(role)) return true;
        return false;
    }

    // Getters
    public String getName() { return name; }
    public String getRole() { return role; }
}
\`\`\`

## Encapsulation
Notice the fields are \`private\`. This is **encapsulation** — the class controls access to its own data. External code must go through methods (getters/setters).

## Java Records (Java 16+)
For simple data carriers:
\`\`\`java
public record User(String name, String email, String role) {
    // Constructor, equals, hashCode, toString auto-generated!
}
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Create a BankAccount Class', type: 'UNIT_TEST',
        description: 'Create a \`BankAccount\` class with: private fields \`balance\` (double) and \`accountNumber\` (String). Constructor takes both. Methods: \`deposit(double amount)\` adds to balance, \`withdraw(double amount)\` subtracts if sufficient funds (return true) or does nothing (return false), \`getBalance()\` returns balance. Do not allow negative deposits.',
        starterCode: 'public class BankAccount {\n    // Add your fields here\n    \n    public BankAccount(String accountNumber, double initialBalance) {\n        // Initialize fields\n    }\n    \n    public boolean deposit(double amount) {\n        // Implement deposit\n        return false;\n    }\n    \n    public boolean withdraw(double amount) {\n        // Implement withdraw\n        return false;\n    }\n    \n    public double getBalance() {\n        return 0; }\n}',
        referenceSolution: 'public class BankAccount {\n    private double balance;\n    private String accountNumber;\n    public BankAccount(String accountNumber, double initialBalance) {\n        this.accountNumber = accountNumber;\n        if (initialBalance > 0) this.balance = initialBalance;\n    }\n    public boolean deposit(double amount) {\n        if (amount <= 0) return false;\n        balance += amount;\n        return true;\n    }\n    public boolean withdraw(double amount) {\n        if (amount <= 0 || amount > balance) return false;\n        balance -= amount;\n        return true;\n    }\n    public double getBalance() { return balance; }\n}',
        testCode: 'Test deposit, withdraw, insufficient funds, negative deposit',
        hints: '["Make balance and accountNumber private", "deposit should return false for negative amounts", "withdraw should check if amount > balance first"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l5.id
      }
    })

    const l6 = await db.lesson.create({
      data: { title: 'Inheritance & Polymorphism', slug: 'inheritance-polymorphism', difficulty: 'STANDARD',
        contextIntro: 'Your system has different types of payments: CreditCard, UPI, NetBanking. They all share common logic (process payment) but differ in implementation. Inheritance models this "is-a" relationship.',
        skillTags: 'OOP,Inheritance,Polymorphism', order: 2, moduleId: m3.id,
        content: `# Inheritance & Polymorphism

## The Scenario
Your payment system supports multiple payment methods. They all share common behavior (process, refund) but each works differently. Inheritance lets you share code while allowing customization.

## Inheritance
\`\`\`java
public abstract class PaymentMethod {
    protected double amount;
    protected String transactionId;

    public PaymentMethod(double amount) {
        this.amount = amount;
        this.transactionId = generateTxnId();
    }

    // Abstract method — subclasses MUST implement
    public abstract boolean process();

    // Common method — shared by all subclasses
    public boolean refund() {
        System.out.println("Refunding: $" + amount);
        return true;
    }

    private String generateTxnId() {
        return "TXN-" + System.currentTimeMillis();
    }
}
\`\`\`

## Polymorphism
\`\`\`java
PaymentMethod credit = new CreditCardPayment(100.0);
PaymentMethod upi = new UpiPayment(50.0);

// Same method call, different behavior!
credit.process();  // CreditCard-specific logic
upi.process();    // UPI-specific logic
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Payment Hierarchy', type: 'UNIT_TEST',
        description: 'Create an abstract class \`PaymentMethod\` with a constructor taking \`double amount\`, an abstract method \`public abstract boolean process()\`, and a concrete method \`public double getAmount()\`. Then create two subclasses: \`CreditCardPayment\` (process returns true and prints "Processing credit card: $amount") and \`UpiPayment\` (process returns true and prints "Processing UPI: $amount").',
        starterCode: '// Create your classes here\n\npublic class PaymentDemo {\n    public static void main(String[] args) {\n        // This should work:
        PaymentMethod cc = new CreditCardPayment(100.0);
        PaymentMethod upi = new UpiPayment(50.0);\n        cc.process();
        upi.process();\n    }\n}',
        referenceSolution: 'public abstract class PaymentMethod {\n    protected double amount;\n    public PaymentMethod(double amount) { this.amount = amount; }\n    public abstract boolean process();\n    public double getAmount() { return amount; }\n}\npublic class CreditCardPayment extends PaymentMethod {\n    public CreditCardPayment(double amount) { super(amount); }\n    public boolean process() { System.out.println("Processing credit card: $" + amount); return true; }\n}\npublic class UpiPayment extends PaymentMethod {\n    public UpiPayment(double amount) { super(amount); }\n    public boolean process() { System.out.println("Processing UPI: $" + amount); return true; }\n}',
        testCode: 'Test polymorphic calls to process()',
        hints: '["Use the abstract keyword for the class and the process method", "Subclasses use extends PaymentMethod", "Call super(amount) in subclass constructors"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l6.id
      }
    })

    // Module 4: Collections
    const l7 = await db.lesson.create({
      data: { title: 'ArrayList & LinkedList', slug: 'arraylist-linkedlist', difficulty: 'STANDARD',
        contextIntro: 'You are building a session store for 10 million users. You need O(1) lookups. Understanding which collection to use and when is critical for system performance.',
        skillTags: 'Collections,List,ArrayList', order: 1, moduleId: m4.id,
        content: `# ArrayList & LinkedList

## The Scenario
You are building a notification system that stores unread notifications for each user. ArrayList is perfect — fast random access when users click on notification #5.

## ArrayList
\`\`\`java
import java.util.ArrayList;
import java.util.List;

List<String> notifications = new ArrayList<>();
notifications.add("New order received");
notifications.add("Payment confirmed");
notifications.add("Order shipped");

// Random access: O(1)
String first = notifications.get(0);

// Size
int count = notifications.size();

// Contains check
boolean hasNew = notifications.contains("New order received");
\`\`\`

## When to Use What

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| Get by index | O(1) | O(n) |
| Add at end | O(1) amortized | O(1) |
| Add at beginning | O(n) | O(1) |
| Remove from beginning | O(n) | O(1) |
| Memory | Compact | More (node pointers) |

**Rule of thumb**: Use \`ArrayList\` by default. Only switch to \`LinkedList\` if you do frequent insertions/deletions at the beginning.
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Task Manager', type: 'UNIT_TEST',
        description: 'Create a \`TaskManager\` class with a \`List<String>\` field. Implement: \`addTask(String task)\`, \`removeTask(int index)\` (return the removed task or null if invalid index), \`getTasks()\` returns the list, \`findTask(String keyword)\` returns the first task containing the keyword or null. Use ArrayList.',
        starterCode: 'import java.util.ArrayList;\nimport java.util.List;\n\npublic class TaskManager {\n    // Add your list field here\n    \n    public TaskManager() {\n        // Initialize the list\n    }\n    \n    public void addTask(String task) {\n    }\n    \n    public String removeTask(int index) {\n        return null;\n    }\n    \n    public List<String> getTasks() {\n        return null; }\n    \n    public String findTask(String keyword) {\n        return null; }\n}',
        referenceSolution: 'import java.util.ArrayList;\nimport java.util.List;\npublic class TaskManager {\n    private List<String> tasks = new ArrayList<>();\n    public void addTask(String task) { tasks.add(task); }\n    public String removeTask(int index) {\n        if (index < 0 || index >= tasks.size()) return null;\n        return tasks.remove(index);\n    }\n    public List<String> getTasks() { return tasks; }\n    public String findTask(String keyword) {\n        for (String task : tasks) {\n            if (task.contains(keyword)) return task;\n        }\n        return null;\n    }\n}',
        testCode: 'Test add, remove, find, and edge cases',
        hints: '["Initialize tasks as new ArrayList<>() in constructor", "removeTask should check index bounds", "findTask uses .contains() on each string"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l7.id
      }
    })

    const l8 = await db.lesson.create({
      data: { title: 'HashMap — The Most Used Collection', slug: 'hashmap', difficulty: 'STANDARD',
        contextIntro: 'You are building a session store for 10 million users and need O(1) lookups by session ID. HashMap is the answer — it is probably the most used data structure in production Java code.',
        skillTags: 'Collections,Map,HashMap', order: 2, moduleId: m4.id,
        content: `# HashMap

## The Scenario
Your API gateway needs to look up user sessions millions of times per second. \`HashMap\` gives you O(1) average lookup time — constant time regardless of how many entries exist.

## Basic Operations
\`\`\`java
import java.util.HashMap;
import java.util.Map;

Map<String, String> sessions = new HashMap<>();
sessions.put("sess_abc123", "user_456");
sessions.put("sess_def456", "user_789");

// Lookup: O(1) average
String userId = sessions.get("sess_abc123");

// Check existence
boolean exists = sessions.containsKey("sess_abc123");

// Safe get with default
String value = sessions.getOrDefault("nonexistent", "default");

// Iterate
for (Map.Entry<String, String> entry : sessions.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
\`\`\`

## How HashMap Works Internally
1. Calls \`hashCode()\` on the key
2. Applies a hash function to find the bucket index
3. If collision (same bucket), uses \`equals()\` to find exact match
4. Java 8+: bucket becomes a tree (not linked list) if too many collisions

### Always Override Both!
If you use custom objects as keys, you MUST override both \`hashCode()\` and \`equals()\`.
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Word Frequency Counter', type: 'UNIT_TEST',
        description: 'Write a method \`public static Map<String, Integer> countWords(String text)\` that returns a HashMap counting word frequencies. Split by spaces, convert to lowercase, and ignore empty strings. For example, "hello world hello" should return {hello: 2, world: 1}.',
        starterCode: 'import java.util.HashMap;\nimport java.util.Map;\n\npublic class WordCounter {\n    public static Map<String, Integer> countWords(String text) {\n        Map<String, Integer> counts = new HashMap<>();\n        // Implement word counting\n        return counts;\n    }\n    \n    public static void main(String[] args) {\n        Map<String, Integer> result = countWords("the cat sat on the mat the cat");\n        System.out.println(result);\n    }\n}',
        referenceSolution: 'import java.util.HashMap;\nimport java.util.Map;\npublic class WordCounter {\n    public static Map<String, Integer> countWords(String text) {\n        Map<String, Integer> counts = new HashMap<>();\n        if (text == null || text.isEmpty()) return counts;\n        String[] words = text.toLowerCase().split("\\\\s+");\n        for (String word : words) {\n            if (word.isEmpty()) continue;\n            counts.put(word, counts.getOrDefault(word, 0) + 1);\n        }\n        return counts;\n    }\n    public static void main(String[] args) {\n        System.out.println(countWords("the cat sat on the mat the cat"));\n    }\n}',
        testCode: 'Test with various strings, null, empty',
        hints: '["Split text using .split(\"\\\\s+\") for any whitespace", "Use getOrDefault to increment counts safely", "Handle null and empty input at the start"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l8.id
      }
    })

    // Module 5: Exceptions
    const l9 = await db.lesson.create({
      data: { title: 'Try-Catch-Finally & Custom Exceptions', slug: 'exceptions', difficulty: 'STANDARD',
        contextIntro: "Your API calls an external payment service. Sometimes it is down, sometimes it times out. Your code must handle these failures gracefully — not crash the entire application.",
        skillTags: 'Exceptions,Error Handling', order: 1, moduleId: m5.id,
        content: `# Exception Handling

## The Scenario
Your microservice calls an external payment API. It might throw \`IOException\` (network down), \`TimeoutException\` (slow response), or return invalid data. Exception handling prevents one bad request from crashing everything.

## Try-Catch-Finally
\`\`\`java
public String processPayment(String orderId) {
    try {
        PaymentResult result = paymentGateway.charge(orderId);
        return result.getTransactionId();
    } catch (NetworkException e) {
        logger.error("Network error for order: " + orderId, e);
        throw new PaymentRetryException("Retry later", e);
    } catch (InvalidOrderException e) {
        logger.warn("Invalid order: " + orderId);
        return null;
    } finally {
        // Always runs — even if exception thrown
        metrics.recordAttempt();
    }
}
\`\`\`

## Custom Exceptions
\`\`\`java
public class InsufficientFundsException extends RuntimeException {
    private final double balance;
    private final double attempted;

    public InsufficientFundsException(double balance, double attempted) {
        super(String.format(
            "Insufficient funds. Balance: $%.2f, Attempted: $%.2f",
            balance, attempted));
        this.balance = balance;
        this.attempted = attempted;
    }
}
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Safe File Reader', type: 'UNIT_TEST',
        description: 'Create a method \`public static String safeRead(String filename)\` that throws \`IllegalArgumentException\` if filename is null or empty. Use try-catch to simulate reading. If filename ends with ".txt", return "Content of " + filename. If it ends with ".csv", return "CSV data from " + filename. For any other extension, throw an \`UnsupportedOperationException\`.',
        starterCode: 'public class SafeReader {\n    public static String safeRead(String filename) {\n        // Implement safe file reading logic\n        return null;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(safeRead("data.txt"));\n    }\n}',
        referenceSolution: 'public class SafeReader {\n    public static String safeRead(String filename) {\n        if (filename == null || filename.isEmpty()) {\n            throw new IllegalArgumentException("Filename cannot be null or empty");\n        }\n        if (filename.endsWith(".txt")) return "Content of " + filename;\n        if (filename.endsWith(".csv")) return "CSV data from " + filename;\n        throw new UnsupportedOperationException("Unsupported file type: " + filename);\n    }\n    public static void main(String[] args) {\n        System.out.println(safeRead("data.txt"));\n    }\n}',
        testCode: 'Test with .txt, .csv, null, empty, and .pdf',
        hints: '["First validate filename is not null or empty", "Use .endsWith() to check file extension", "Throw IllegalArgumentException for bad input, UnsupportedOperationException for wrong type"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l9.id
      }
    })

    // Module 6: Streams
    const l10 = await db.lesson.create({
      data: { title: 'Stream API: Filter, Map, Reduce', slug: 'streams', difficulty: 'STANDARD',
        contextIntro: 'Your analytics dashboard needs to find all orders above $100, apply tax, and calculate the total. Instead of writing 3 loops, the Stream API chains these operations into a single pipeline.',
        skillTags: 'Streams,Lambdas,Functional', order: 1, moduleId: m6.id,
        content: `# Stream API

## The Scenario
Your data pipeline needs to: filter orders by status, transform them, and aggregate results. The Stream API replaces verbose loops with declarative, readable pipelines.

## Basic Pipeline
\`\`\`java
import java.util.List;
import java.util.stream.Collectors;

List<Order> orders = getOrders();

List<String> processed = orders.stream()
    .filter(o -> o.getStatus() == Status.COMPLETED)  // Keep only completed
    .map(o -> o.getCustomerName())                     // Transform to names
    .distinct()                                        // Remove duplicates
    .sorted()                                          // Sort alphabetically
    .collect(Collectors.toList());                     // Collect to list
\`\`\`

## Reduction
\`\`\`java
double total = orders.stream()
    .filter(o -> o.getAmount() > 100)
    .mapToDouble(Order::getAmount)
    .sum();
\`\`\`

## Collectors
\`\`\`java
// Group by category
Map<String, List<Order>> byCategory = orders.stream()
    .collect(Collectors.groupingBy(Order::getCategory));

// Partition into two groups
Map<Boolean, List<Order>> partitioned = orders.stream()
    .collect(Collectors.partitioningBy(o -> o.getAmount() > 100));
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Analyze Order Data with Streams', type: 'UNIT_TEST',
        description: 'Given a \`List<Integer>\` of order amounts, use streams to: (1) filter amounts > 50, (2) apply 10% tax to each, (3) find the maximum taxed amount. Method: \`public static double findMaxTaxedOrder(List<Integer> amounts)\`. Return 0.0 if the filtered list is empty. Use \`mapToDouble\` and \`max\`.',
        starterCode: 'import java.util.List;\nimport java.util.OptionalDouble;\n\npublic class OrderAnalyzer {\n    public static double findMaxTaxedOrder(List<Integer> amounts) {\n        // Use streams: filter > 50, apply 10% tax, find max\n        return 0.0;\n    }\n    public static void main(String[] args) {\n        List<Integer> orders = List.of(20, 50, 100, 150, 75, 200, 30);
        System.out.println(findMaxTaxedOrder(orders)); // Should print 220.0 (200 * 1.1)
    }\n}',
        referenceSolution: 'import java.util.List;\npublic class OrderAnalyzer {\n    public static double findMaxTaxedOrder(List<Integer> amounts) {\n        return amounts.stream()\n            .filter(a -> a > 50)\n            .mapToDouble(a -> a * 1.1)\n            .max()\n            .orElse(0.0);\n    }\n    public static void main(String[] args) {\n        List<Integer> orders = List.of(20, 50, 100, 150, 75, 200, 30);\n        System.out.println(findMaxTaxedOrder(orders));\n    }\n}',
        testCode: 'Test with various lists, empty list, all below threshold',
        hints: '["Start with amounts.stream()", "Chain .filter(a -> a > 50) then .mapToDouble(a -> a * 1.1)", "Use .max().orElse(0.0) to handle empty results"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l10.id
      }
    })

    // Add a couple more lessons for richness
    const l11 = await db.lesson.create({
      data: { title: 'Interfaces & Abstract Classes', slug: 'interfaces-abstract', difficulty: 'STANDARD',
        contextIntro: 'Your team is designing a plugin system. Different payment gateways (Stripe, Razorpay, PayPal) must implement a common interface so the checkout code does not care which provider is used.',
        skillTags: 'OOP,Interfaces,Design', order: 3, moduleId: m3.id,
        content: `# Interfaces & Abstract Classes

## The Scenario
Your startup supports multiple payment providers. When you switch from Stripe to Razorpay, the checkout code should not need to change. Interfaces make this possible.

## Interface
\`\`\`java
public interface PaymentGateway {
    boolean charge(double amount);
    boolean refund(String transactionId);
    default String getProviderName() {
        return "Unknown";
    }
}
\`\`\`

## Implementation
\`\`\`java
public class StripeGateway implements PaymentGateway {
    public boolean charge(double amount) {
        System.out.println("Stripe: Charging $" + amount);
        return true;
    }
    public boolean refund(String txnId) {
        System.out.println("Stripe: Refunding " + txnId);
        return true;
    }
    public String getProviderName() { return "Stripe"; }
}
\`\`\`

## Interface vs Abstract Class
- **Interface**: "can-do" contract (what). Multiple inheritance.
- **Abstract class**: "is-a" partial implementation (how + what). Single inheritance.
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Implement a Notifiable Interface', type: 'UNIT_TEST',
        description: 'Create an interface \`Notifiable\` with method \`void send(String message)\` and a default method \`String getType()\` returning \"generic\". Create two implementations: \`EmailNotifier\` (send prints \"Email: message\", getType returns \"email\") and \`SMSNotifier\` (send prints \"SMS: message\", getType returns \"sms\").',
        starterCode: '// Create your interface and classes here\n\npublic class NotificationDemo {\n    public static void main(String[] args) {\n        Notifiable email = new EmailNotifier();\n        Notifiable sms = new SMSNotifier();\n        email.send(\"Hello\");\n        sms.send(\"World\");\n    }\n}',
        referenceSolution: 'public interface Notifiable {\n    void send(String message);\n    default String getType() { return "generic"; }\n}\npublic class EmailNotifier implements Notifiable {\n    public void send(String message) { System.out.println("Email: " + message); }\n    public String getType() { return "email"; }\n}\npublic class SMSNotifier implements Notifiable {\n    public void send(String message) { System.out.println("SMS: " + message); }\n    public String getType() { return "sms"; }\n}',
        testCode: 'Test interface polymorphism',
        hints: '["Use the interface and default keywords", "Implementing classes use implements Notifiable", "Override getType() in each implementation"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l11.id
      }
    })

    const l12 = await db.lesson.create({
      data: { title: 'HashSet & TreeSet', slug: 'set-collections', difficulty: 'STANDARD',
        contextIntro: 'You need to track unique tags on user posts and display them in alphabetical order. HashSet for uniqueness, TreeSet for sorted uniqueness.',
        skillTags: 'Collections,Set,HashSet', order: 3, moduleId: m4.id,
        content: `# Set Collections

## The Scenario
Your content platform needs to track unique tags. Users might add \"java\" 100 times, but it should only appear once in the tag list. \`HashSet\` gives you O(1) uniqueness checks.

## HashSet
\`\`\`java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("spring");
tags.add("java");  // Duplicate — ignored!
System.out.println(tags.size());  // 2
\`\`\`

## TreeSet (Sorted)
\`\`\`java
Set<String> sortedTags = new TreeSet<>();
sortedTags.add("zebra");
sortedTags.add("apple");
sortedTags.add("mango");
// Iterates in alphabetical order: apple, mango, zebra
\`\`\`
`
      }
    })

    await db.exercise.create({
      data: {
        title: 'Build a Duplicate Remover', type: 'UNIT_TEST',
        description: 'Write a method \`public static List<String> removeDuplicates(List<String> items)\` that returns a new list with duplicates removed, preserving insertion order. Use \`LinkedHashSet\` internally. Handle null input by returning an empty list.',
        starterCode: 'import java.util.*;\n\npublic class DuplicateRemover {\n    public static List<String> removeDuplicates(List<String> items) {\n        // Use LinkedHashSet to remove duplicates while preserving order\n        return new ArrayList<>();\n    }\n    public static void main(String[] args) {\n        List<String> input = List.of("a", "b", "a", "c", "b", "d");\n        System.out.println(removeDuplicates(input)); // [a, b, c, d]\n    }\n}',
        referenceSolution: 'import java.util.*;\npublic class DuplicateRemover {\n    public static List<String> removeDuplicates(List<String> items) {\n        if (items == null) return new ArrayList<>();\n        return new ArrayList<>(new LinkedHashSet<>(items));\n    }\n    public static void main(String[] args) {\n        System.out.println(removeDuplicates(List.of("a", "b", "a", "c", "b", "d")));\n    }\n}',
        testCode: 'Test with duplicates, null, empty list',
        hints: '["LinkedHashSet preserves insertion order while removing duplicates", "Simply wrap the list: new LinkedHashSet<>(items)", "Convert back to ArrayList for the return value"]',
        difficulty: 'STANDARD', xpReward: 50, lessonId: l12.id
      }
    })

    // Create some demo users for leaderboard
    const demoUsers = [
      { username: 'Aman', email: 'aman@codeforge.dev', passwordHash: 'demo', displayName: 'Aman', xp: 2400, streak: 7, exercisesCompleted: 42 },
      { username: 'Rahul', email: 'rahul@codeforge.dev', passwordHash: 'demo', displayName: 'Rahul', xp: 1800, streak: 5, exercisesCompleted: 31 },
      { username: 'Priya', email: 'priya@codeforge.dev', passwordHash: 'demo', displayName: 'Priya', xp: 3200, streak: 12, exercisesCompleted: 55 },
      { username: 'Dev', email: 'dev@codeforge.dev', passwordHash: 'demo', displayName: 'Dev', xp: 900, streak: 3, exercisesCompleted: 18 },
      { username: 'Sara', email: 'sara@codeforge.dev', passwordHash: 'demo', displayName: 'Sara', xp: 1500, streak: 9, exercisesCompleted: 28 },
      { username: 'Mike', email: 'mike@codeforge.dev', passwordHash: 'demo', displayName: 'Mike', xp: 4100, streak: 15, exercisesCompleted: 72 },
      { username: 'Zara', email: 'zara@codeforge.dev', passwordHash: 'demo', displayName: 'Zara', xp: 2700, streak: 8, exercisesCompleted: 48 },
    ]

    for (const u of demoUsers) {
      const user = await db.user.create({ data: u })
      // Give some badges to demo users
      if (u.exercisesCompleted >= 10) {
        const badge = await db.badge.findFirst({ where: { triggerValue: 10, category: 'GRIND' } })
        if (badge) await db.userBadge.create({ data: { userId: user.id, badgeId: badge.id } })
      }
      if (u.streak >= 7) {
        const badge = await db.badge.findFirst({ where: { triggerValue: 7, category: 'STREAK' } })
        if (badge) await db.userBadge.create({ data: { userId: user.id, badgeId: badge.id } })
      }
    }

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      stats: {
        paths: 5,
        modules: 6,
        lessons: 12,
        exercises: 12,
        badges: 18,
        demoUsers: 7
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}